import { render } from "@testing-library/react";
import Button from "../src/components/ui/Button";

describe("Button tests", () => {
  test("rendered", () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });
});
