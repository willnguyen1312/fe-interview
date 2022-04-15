import { formatDate } from "./date";

describe("formatDate function", () => {
  it("should convert date string to the right format", () => {
    const input = new Date(Date.UTC(2022, 3, 15));
    const actual = formatDate(input.toISOString());
    const expected = "Apr 15, 2022";

    expect(actual).toBe(expected);
  });
});
