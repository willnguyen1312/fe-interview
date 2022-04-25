import { axe } from "jest-axe";

export async function checkAccessibility(element) {
  const results = await axe(element);
  expect(results).toHaveNoViolations();
}
