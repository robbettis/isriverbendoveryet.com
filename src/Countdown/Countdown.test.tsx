import React from "react";
import { render } from "@testing-library/react";
import Countdown from "./Countdown";

describe("Countdown", () => {
  const firstDay = new Date("2022-06-03T19:00:00-04:00");

  it("renders yep before the event", () => {
    const before = new Date("2022-05-28T19:00:00-04:00");

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
    const lastDay = new Date("2022-06-05T19:00:00-04:00");

    const { getByRole, getByText } = render(<Countdown now={lastDay} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Nope");
    const message = getByText(/funnel cakes and regret/);
    expect(message).toBeInTheDocument();
  });

  it("renders yep after the event", () => {
    const after = new Date("2022-07-02T19:00:00-04:00");

    const { getByRole, getByText } = render(<Countdown now={after} />);

    const heading = getByRole("heading");
    expect(heading.innerHTML).toMatch("Yep");
    const message = getByText(/But don't get too excited/);
    expect(message).toBeInTheDocument();
  });

  it("renders a time remaining", () => {
    const { getByText } = render(<Countdown now={firstDay} />);

    const remaining = getByText(/months|days|hrs|mins|secs/);

    expect(remaining).toBeInTheDocument();
  });

  it("renders unsure when we've past the next event date", () => {
    const wayAfter = new Date("2023-08-29T18:15:00-04:00");

    const { getByText } = render(<Countdown now={wayAfter} />);

    expect(getByText("???")).toBeInTheDocument();
    expect(getByText(":)")).toBeInTheDocument();
  });
});
