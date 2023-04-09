import React from "react";
import { render } from "@testing-library/react";
import { currentEvent, nextEvent } from "../lib/events";
import { add, sub } from "date-fns";

import Countdown from "./Countdown";

describe("Countdown", () => {
  it("renders yep before the event", () => {
    const beforeEvent = sub(currentEvent.start, { hours: 1 });

    const { getByRole, getByText } = render(<Countdown now={beforeEvent} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Yep");
    const message = getByText(/But don't get too excited/);
    expect(message).toBeInTheDocument();
  });

  it("renders nope with the first day's message", () => {
    const firstDay = add(currentEvent.start, { hours: 1 });

    const { getByRole, getByText } = render(<Countdown now={firstDay} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Nope");
    const message = getByText(/Get out your clean tank top/);
    expect(message).toBeInTheDocument();
  });

  it("renders nope with the last day's message", () => {
    const lastDay = sub(currentEvent.end, { hours: 1 });

    const { getByRole, getByText } = render(<Countdown now={lastDay} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Nope");
    const message = getByText(/funnel cakes and regret/);
    expect(message).toBeInTheDocument();
  });

  it("renders yep after the event", () => {
    const after = add(currentEvent.end, { hours: 1 });

    const { getByRole, getByText } = render(<Countdown now={after} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Yep");
    const message = getByText(/But don't get too excited/);
    expect(message).toBeInTheDocument();
  });

  it("renders a time remaining", () => {
    const firstDay = add(currentEvent.start, { hours: 1 });
    const { getByText } = render(<Countdown now={firstDay} />);

    const remaining = getByText(/months|days|hrs|mins|secs/);

    expect(remaining).toBeInTheDocument();
  });

  it("renders unsure when we've past the next event date", () => {
    const wayAfter = add(nextEvent.start, { hours: 1 });

    const { getByText } = render(<Countdown now={wayAfter} />);

    expect(getByText("???")).toBeInTheDocument();
    expect(getByText(":)")).toBeInTheDocument();
  });
});
