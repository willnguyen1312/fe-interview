import { formatDate } from "./date";

describe("formatDate function", () => {
  it("should convert date string to the right format", () => {
    const input = "2020-08-26T20:59:39.475347Z";
    const actual = formatDate(input);
    const expected = "Aug 27, 2020";

    expect(actual).toBe(expected);
  });
});
