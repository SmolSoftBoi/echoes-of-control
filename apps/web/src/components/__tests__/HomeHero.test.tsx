// HomeHero.test.tsx
// -----------------------------------------------------------------------------
// High‑coverage Vitest suite for <HomeHero /> component.
// -----------------------------------------------------------------------------
// • Uses Testing‑Library best practices (screen, user‑event)
// • Adds keyboard‑accessibility & snapshot checks
// • Provides a helper `renderHero()` to avoid repeat boilerplate
// • Written in TypeScript for safer assertions
// -----------------------------------------------------------------------------

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import React from "react";

import { HomeHero } from "../HomeHero";

// 🔧 Test helper
const renderHero = () => render(<HomeHero />);

/**
 * Utility wrapper to stub `window.location.assign` so we can assert navigation
 * without actually leaving the test environment.
 */
const spyNavigation = () => {
  const originalAssign = window.location.assign;
  const fn = vi.fn();
  // @ts-expect-error – jsdom allows reassignment in tests
  window.location.assign = fn;
  return () => {
    window.location.assign = originalAssign;
  };
};

// -----------------------------------------------------------------------------
// TESTS
// -----------------------------------------------------------------------------

describe("<HomeHero />", () => {
  it("renders the welcome heading", () => {
    renderHero();
    const heading = screen.getByRole("heading", {
      name: /welcome to echoes of control/i,
    });
    expect(heading).toBeVisible();
  });

  it("links to the start‑exploring CTA", () => {
    renderHero();
    const link = screen.getByRole("link", { name: /start exploring/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("allows keyboard navigation to the CTA", async () => {
    renderHero();
    const user = userEvent.setup();
    await user.tab(); // focus first tabbable element (should be the link)
    const link = screen.getByRole("link", { name: /start exploring/i });
    expect(link).toHaveFocus();
  });

  it("navigates when the CTA is activated", async () => {
    const restore = spyNavigation();
    renderHero();

    const user = userEvent.setup();
    const link = screen.getByRole("link", { name: /start exploring/i });
    await user.click(link);

    expect(window.location.assign).toHaveBeenCalledWith("/");
    restore();
  });

  it("matches snapshot", () => {
    const { container } = renderHero();
    expect(container).toMatchSnapshot();
  });
});
