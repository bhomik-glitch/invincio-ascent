import { getSession, readJson, json, type Req, type Res } from "./_lib";
import tests from "./_tests/index";

// GET  /api/tests         → list of tests (no questions)
// GET  /api/tests?id=X    → one test, answers stripped
// POST /api/tests?id=X    → { answers: { [questionIndex]: optionIndex } } → score + answer key
export default async function handler(req: Req, res: Res) {
  if (!getSession(req)) return json(res, 401, { error: "Please log in" });

  const id = new URL(req.url || "/", "http://x").searchParams.get("id");
  if (!id) {
    return json(res, 200, tests.map((t) => ({
      id: t.id, title: t.title, durationMinutes: t.durationMinutes, questionCount: t.questions.length,
    })));
  }

  const test = tests.find((t) => t.id === id);
  if (!test) return json(res, 404, { error: "No such test" });

  if (req.method === "POST") {
    const answers = ((await readJson(req)).answers || {}) as Record<string, number>;
    const key = test.questions.map((q) => q.answer);
    const score = key.filter((a, i) => answers[i] === a).length;
    return json(res, 200, { score, total: key.length, key });
  }

  json(res, 200, { ...test, questions: test.questions.map(({ answer: _a, ...q }) => q) });
}
