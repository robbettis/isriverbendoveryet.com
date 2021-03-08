import React from "react";
import { render } from "@testing-library/react";
import Countdown from "./Countdown";

describe("Countdown", () => {
  const firstDay = new Date("2019-05-29T19:00:00-04:00");

  it("renders yep before the event", () => {
    const before = new Date("2019-05-28T19:00:00-04:00");

    const { getByRole, getByText } = render(<Countdown now={before} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Yep");
    const message = getByText(/But don't get too excited/);
    expect(message).toBeInTheDocument();
  });

  it("renders nope with the first day's message", () => {
    const { getByRole, getByText } = render(<Countdown now={firstDay} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Nope");
    const message = getByText(/Get out your clean tank top/);
    expect(message).toBeInTheDocument();
  });

  it("renders nope with the last day's message", () => {
    const lastDay = new Date("2019-06-01T19:00:00-04:00");
    
    const { getByRole, getByText } = render(<Countdown now={lastDay} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Nope");
    const message = getByText(/the end is near/);
    expect(message).toBeInTheDocument();
  });

  it("renders yep after the event", () => {
    const after = new Date("2019-06-02T19:00:00-04:00");

    const { getByRole, getByText } = render(<Countdown now={after} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Yep");
    const message = getByText(/But don't get too excited/);
    expect(message).toBeInTheDocument();
  });

  it("renders a time remaining", () => {
    const { getByText } = render(<Countdown now={firstDay} />);

    const remaining = getByText("3 days 4 hrs 0 secs");
    expect(remaining).toBeInTheDocument();
  });

  it("renders unsure when we've past the next event date", () => {
    const wayAfter = new Date("2020-08-29T18:15:00-04:00");

    const { getByText } = render(<Countdown now={wayAfter} />);

    expect(getByText("???")).toBeInTheDocument();
    expect(getByText(":)")).toBeInTheDocument();
  });
});
