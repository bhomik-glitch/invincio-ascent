import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import TakeTest from "./TakeTest";

const test = {
  id: "oir-1", title: "OIR Test 1", durationMinutes: 30,
  questions: [
    { q: "One plus one?", options: ["1", "2"] },
    { q: "Two plus two?", options: ["3", "4"] },
  ],
};

const jsonRes = (body: unknown, status = 200) =>
  Promise.resolve({ ok: status < 300, status, json: () => Promise.resolve(body) } as Response);

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn((_url: string, init?: RequestInit) =>
    init?.method === "POST" ? jsonRes({ score: 1, total: 2, key: [1, 1] }) : jsonRes(test)));
  vi.spyOn(window, "confirm").mockReturnValue(true);
  window.scrollTo = vi.fn();
});

const renderPage = () =>
  render(
    <HelmetProvider>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={["/tests/oir-1"]}>
          <Routes><Route path="/tests/:id" element={<TakeTest />} /></Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );

describe("TakeTest", () => {
  it("loads questions, records answers, submits and shows the score", async () => {
    renderPage();
    expect(await screen.findByText("One plus one?")).toBeInTheDocument();
    expect(screen.getByText("30:00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("2"));
    expect(screen.getByText("1/2 answered")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Submit test"));
    await waitFor(() => expect(screen.getByText("Score 1/2")).toBeInTheDocument());

    const post = (fetch as ReturnType<typeof vi.fn>).mock.calls.find(([, init]) => init?.method === "POST");
    expect(JSON.parse(post![1].body)).toEqual({ answers: { 0: 1 } });
    expect(JSON.parse(localStorage.getItem("oir:score:oir-1")!)).toMatchObject({ score: 1, total: 2 });
  });
});
