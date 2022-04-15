export function filter(collection, predicate) {
  const result = [];

  Object.keys(collection).forEach((key) => {
    const item = collection[key];
    if (predicate(item)) {
      result.push(item);
    }
  });

  return result;
}
