// ════════════════════════════════════════════════════════════════════════════
//  Gmail → Google Sheets  |  Real-time Auto Lead Capture
//  Runs every 5 minutes via time-driven trigger.
//  Only scans emails received SINCE the last run (incremental).
//  Message_ID dedup prevents duplicates even across overlapping windows.
// ════════════════════════════════════════════════════════════════════════════

// ─── CONFIG ──────────────────────────────────────────────────────────────────

var CONFIG = {
  SHEET_ID:    '1DBbKndE7RVRsbpgFCq1ih6mlExLcEld3fvWALTBnM_8',
  SHEET_NAME:  'Leads',
  BATCH_SIZE:  50,    // threads per GmailApp.search() page
  MAX_THREADS: 200,   // safety cap per run (5-min window won't have more)
  PROP_KEY:    'LAST_RUN_TS', // key stored in PropertiesService
};

var HEADERS = ['Name', 'Email', 'Phone', 'Received_Time', 'Message_ID'];

// ─── AUTO TRIGGER ENTRY POINT ─────────────────────────────────────────────────

/**
 * Called automatically every 5 minutes by the time-driven trigger.
 * Only looks at emails since the last successful run.
 */
function autoExtractLeads() {
  var props      = PropertiesService.getScriptProperties();
  var lastRunTs  = parseInt(props.getProperty(CONFIG.PROP_KEY) || '0', 10);
  var runStartTs = Date.now(); // record before processing — no gap between runs

  // Build incremental search query
  // "after:" uses UNIX seconds; Gmail accepts it in GmailApp.search()
  var afterSecs  = Math.floor((lastRunTs || (runStartTs - 10 * 60 * 1000)) / 1000);
  var query      = 'subject:"received your message" after:' + afterSecs;

  Logger.log('=== autoExtractLeads() | last run: %s | query: %s ===',
    lastRunTs ? new Date(lastRunTs).toISOString() : 'FIRST RUN', query);

  var sheet       = getOrCreateSheet();
  var existingIds = loadExistingMessageIds(sheet);
  var newRows     = [];
  var start       = 0;

  while (start < CONFIG.MAX_THREADS) {
    var threads = GmailApp.search(query, start, CONFIG.BATCH_SIZE);
    if (!threads.length) break;

    for (var i = 0; i < threads.length; i++) {
      var row = processThread(threads[i], existingIds);
      if (row) {
        newRows.push(row);
        existingIds.add(row[4]); // Message_ID — block in-batch dupes
      }
    }

    start += threads.length;
    if (threads.length < CONFIG.BATCH_SIZE) break;
  }

  if (newRows.length) {
    batchWrite(sheet, newRows);
    Logger.log('SUCCESS — %s new lead(s) added.', newRows.length);
  } else {
    Logger.log('No new leads in this window.');
  }

  // Always update timestamp so next run only looks at new emails
  props.setProperty(CONFIG.PROP_KEY, String(runStartTs));
}

// ─── ONE-TIME FULL EXTRACTION ─────────────────────────────────────────────────

/**
 * Run ONCE manually to back-fill all existing leads from inbox.
 * After this, autoExtractLeads() handles everything going forward.
 */
function extractAllLeads() {
  Logger.log('=== extractAllLeads() — full inbox scan ===');

  var sheet       = getOrCreateSheet();
  var existingIds = loadExistingMessageIds(sheet);
  var newRows     = [];
  var start       = 0;
  var MAX         = 500;

  while (start < MAX) {
    var threads = GmailApp.search('subject:"received your message"', start, CONFIG.BATCH_SIZE);
    if (!threads.length) break;

    for (var i = 0; i < threads.length; i++) {
      var row = processThread(threads[i], existingIds);
      if (row) {
        newRows.push(row);
        existingIds.add(row[4]);
      }
    }

    start += threads.length;
    if (threads.length < CONFIG.BATCH_SIZE) break;
  }

  if (newRows.length) {
    batchWrite(sheet, newRows);
    Logger.log('Wrote %s lead(s) total.', newRows.length);
  } else {
    Logger.log('No new leads found (all may already exist in sheet).');
  }
}

/**
 * Clears the sheet and re-extracts everything from scratch.
 * Use if previous runs wrote bad data.
 */
function resetAndExtractAll() {
  var sheet   = getOrCreateSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
    Logger.log('Cleared %s data rows.', lastRow - 1);
  }
  PropertiesService.getScriptProperties().deleteProperty(CONFIG.PROP_KEY);
  extractAllLeads();
}

// ─── THREAD PROCESSING ───────────────────────────────────────────────────────

function processThread(thread, existingIds) {
  var messages = thread.getMessages();
  if (!messages.length) return null;

  var msg   = messages[messages.length - 1]; // latest message only
  var msgId = msg.getId();

  if (existingIds.has(msgId)) return null;

  var lead = parseLead(msg.getPlainBody());
  if (!lead) return null;

  var timestamp = Utilities.formatDate(
    msg.getDate(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd HH:mm'
  );

  return [lead.name, lead.email, lead.phone, timestamp, msgId];
}

// ─── LEAD PARSING ────────────────────────────────────────────────────────────

function parseLead(body) {
  if (!body) return null;

  var text = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  // Fast pre-check — skip bodies that clearly aren't lead emails
  if (text.indexOf('Name:') === -1 || text.indexOf('Email:') === -1) return null;

  // Isolate CONTENT block to avoid "Quick Actions" duplicate email
  var contentIdx = text.indexOf('CONTENT:');
  if (contentIdx === -1) return null;

  var afterContent = text.slice(contentIdx + 'CONTENT:'.length);
  var sepIdx       = afterContent.indexOf('---');
  var block        = (sepIdx === -1 ? afterContent : afterContent.slice(0, sepIdx)).trim();

  if (!block) return null;

  var nameMatch  = block.match(/^Name\s*:\s*(.+)$/im);
  var emailMatch = block.match(/^Email\s*:\s*([\w.+\-]+@[\w.\-]+\.[a-z]{2,})$/im);
  var phoneMatch = block.match(/^Phone\s*:\s*([\d\s+\-().]{6,20})$/im);

  if (!nameMatch || !emailMatch) return null;

  var email = emailMatch[1].trim().toLowerCase();
  if (!/^[\w.+\-]+@[\w.\-]+\.[a-z]{2,}$/i.test(email)) return null;

  return {
    name:  nameMatch[1].trim(),
    email: email,
    phone: phoneMatch ? phoneMatch[1].trim() : '',
  };
}

// ─── TRIGGER MANAGEMENT ──────────────────────────────────────────────────────

/**
 * Run ONCE to install the 5-minute trigger.
 * Safe to re-run — removes any existing trigger for autoExtractLeads first.
 */
function createAutoTrigger() {
  deleteAutoTrigger(); // remove stale triggers first

  ScriptApp.newTrigger('autoExtractLeads')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('Trigger created — autoExtractLeads() will run every 5 minutes.');
}

/**
 * Removes all existing triggers for autoExtractLeads().
 */
function deleteAutoTrigger() {
  var removed = 0;
  ScriptApp.getProjectTriggers()
    .filter(function(t) { return t.getHandlerFunction() === 'autoExtractLeads'; })
    .forEach(function(t) {
      ScriptApp.deleteTrigger(t);
      removed++;
    });
  if (removed) Logger.log('Removed %s existing trigger(s).', removed);
}

/**
 * Shows all active project triggers in the log.
 */
function listTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  Logger.log('Active triggers: %s', triggers.length);
  triggers.forEach(function(t) {
    Logger.log('  → %s | type: %s', t.getHandlerFunction(), t.getEventType());
  });
}

// ─── SHEET HELPERS ───────────────────────────────────────────────────────────

function getOrCreateSheet() {
  var ss    = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    var hr = sheet.getRange(1, 1, 1, HEADERS.length);
    hr.setFontWeight('bold');
    hr.setBackground('#4A90D9');
    hr.setFontColor('#FFFFFF');
    sheet.setColumnWidths(1, HEADERS.length, 190);
    Logger.log('Created sheet "%s".', CONFIG.SHEET_NAME);
  }

  return sheet;
}

function loadExistingMessageIds(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return new Set();

  return new Set(
    sheet
      .getRange(2, 5, lastRow - 1, 1)
      .getValues()
      .map(function(r) { return String(r[0]).trim(); })
      .filter(function(id) { return id !== ''; })
  );
}

function batchWrite(sheet, rows) {
  sheet
    .getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length)
    .setValues(rows);
}
