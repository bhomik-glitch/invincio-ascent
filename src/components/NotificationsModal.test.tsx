import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationsModal from "./NotificationsModal";
import { batches } from "@/data/batches";

describe("NotificationsModal SSB card", () => {
  it("lists the open offline batch dates from src/data/batches.ts", () => {
    const ssb = batches.find((b) => b.id === "ssb-offline")!;
    render(<NotificationsModal isOpen onClose={() => {}} />);

    fireEvent.click(screen.getByText("SSB Mentorship Program — Offline Batches"));
    for (const slot of ssb.slots) {
      expect(screen.getAllByText(slot.label).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(`Next batch starts ${ssb.slots[0].label}`)).toBeInTheDocument();
  });
});
