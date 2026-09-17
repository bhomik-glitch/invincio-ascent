import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NewCoursesModal from "./NewCoursesModal";
import { batches } from "@/data/batches";

describe("NewCoursesModal enrolment", () => {
  it("opens on the requested batch and enables Pay only once a date and valid details are in", async () => {
    const batch = batches.find((b) => b.id === "ssb-offline")!;
    render(<NewCoursesModal isOpen onClose={() => {}} initialBatch="ssb-offline" />);

    // The grid animates out before the slot view mounts, so wait for the pay button.
    // The soonest date is preselected, so the amount already shows but details are missing.
    const pay = await screen.findByRole("button", { name: /pay ₹3,600 & enroll/i });
    expect(pay).toBeDisabled();
    expect(screen.getAllByText(batch.title).length).toBeGreaterThan(0);

    fireEvent.change(screen.getByPlaceholderText("Full name"), { target: { value: "Aryan Sharma" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "aryan@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/mobile/i), { target: { value: "9876543210" } });
    expect(screen.getByRole("button", { name: /pay ₹3,600 & enroll/i })).toBeEnabled();

    // Switching to the full fee changes the amount on the button
    fireEvent.click(screen.getByLabelText(/full program fee/i));
    expect(screen.getByRole("button", { name: /pay ₹23,600 & enroll/i })).toBeEnabled();
  });
});
