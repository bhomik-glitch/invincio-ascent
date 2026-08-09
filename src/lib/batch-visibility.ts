// Shared visibility rules for batch cards (UpcomingBatches + NewCoursesModal).
// Every batch carries an `until` date — the last day it stays on the site.

// Local-timezone YYYY-MM-DD, directly comparable against an ISO `until` string.
export const today = () => new Date().toLocaleDateString("en-CA");

export const plusDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-CA");
};

// SSB batches stay listed for a week after they start.
export const SSB_VISIBLE_DAYS = 7;

// Written prep batches run until their exam.
// ponytail: placeholder end dates based on the usual exam months — update when
// the official NDA 1/2027, CDS 1/2027 and AFCAT 1/2027 dates are announced.
export const WRITTEN_EXAM_END: Record<"NDA" | "CDS" | "AFCAT", string> = {
  NDA: "2027-04-30",
  CDS: "2027-04-30",
  AFCAT: "2027-02-28",
};

export const isCurrent = (batch: { until: string }) => batch.until >= today();
