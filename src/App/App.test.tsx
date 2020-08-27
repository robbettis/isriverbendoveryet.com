import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe(App, () => {
  it("renders the main countdown", () => {
    const { getByRole } = render(<App />);

    const countdown = getByRole("main");
    expect(countdown).toBeInTheDocument();
  });

  it("renders the credits", () => {
    const { getByRole } = render(<App />);

    const credits = getByRole("contentinfo");
    expect(credits).toBeInTheDocument();
  });
});
