export function removeSameObjectFromArray<T extends Object>(array: T[]) {
  const result: T[] = [];
  array.forEach((each) => {
    if (
      result.every(
        (value) => convertObjectToString(value) != convertObjectToString(each)
      )
    ) {
      result.push(each);
    }
  });
  return result;
}

export function convertObjectToString<T extends Object>(o: T) {
  return Object.entries(o).toString();
}
