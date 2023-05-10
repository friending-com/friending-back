export const stringify = (originString: string, addNumber: number) => {
  return `${originString},${addNumber}`;
};
export const numberize = (string: string) => {
  return string.split(',').map((str) => Number(str));
};
