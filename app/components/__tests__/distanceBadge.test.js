import React from "react";
import { render } from "@testing-library/react";
import { convertRange, proximityColor } from "../../lib/distanceBadge";
import DistanceBadge from "../distanceBadge";

jest.mock("../../lib/distanceBadge", () => ({
  convertRange: jest.fn(),
  proximityColor: jest.fn(),
}));

describe("DistanceBadge", () => {
  it("renders with correct text content and style", () => {
    convertRange.mockReturnValue(0.5);
    proximityColor.mockReturnValue("rgb(255, 0, 0)");

    const { getByText } = render(<DistanceBadge distance={25} />);
    const badge = getByText("25.00");

    expect(convertRange).toHaveBeenCalledWith(25, [0, 50], [0, 1]);
    expect(proximityColor).toHaveBeenCalledWith(0.5);
    expect(badge).toHaveStyle("background-color: rgb(255, 0, 0)");
  });
});
