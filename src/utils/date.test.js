import { formatDate } from "./date";

describe("formatDate function", () => {
  it("should convert date string to the right format", () => {
    const input = new Date(Date.UTC(2022, 3, 15, 0, 0, 0, 0));
    const actual = formatDate(input.toISOString());

    // Since our test input is in UTC, the result can be off by a day
    // as timezone can be either negative value or positive value ranging from -12 to +12
    const possibleResults = ["Apr 14, 2022", "Apr 15, 2022"];

    expect(possibleResults.includes(actual)).toBeTruthy();
  });
});
