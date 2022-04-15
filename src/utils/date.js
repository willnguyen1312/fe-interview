export function formatDate(str) {
  const format = Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
  });

  return format.format(new Date(str));
}
