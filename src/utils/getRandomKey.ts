export const getRandomKey = (radix: number = 16) =>
  Math.random().toString(radix).substring(2, 9);
