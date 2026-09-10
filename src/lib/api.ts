export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** GET when no body, POST JSON otherwise. Throws ApiError on non-2xx. */
export async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(
    path,
    body === undefined
      ? undefined
      : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error || res.statusText);
  return data as T;
}

export type TestSummary = { id: string; title: string; durationMinutes: number; questionCount: number };
export type Question = { q: string; image?: string; options: string[] };
export type Test = { id: string; title: string; durationMinutes: number; questions: Question[] };
export type Result = { score: number; total: number; key: number[] };

const scoreKey = (id: string) => `oir:score:${id}`;
export function saveScore(id: string, r: Result) {
  try { localStorage.setItem(scoreKey(id), JSON.stringify({ score: r.score, total: r.total, at: Date.now() })); } catch { /* private mode */ }
}
export function lastScore(id: string): { score: number; total: number; at: number } | null {
  try { return JSON.parse(localStorage.getItem(scoreKey(id)) || "null"); } catch { return null; }
}
