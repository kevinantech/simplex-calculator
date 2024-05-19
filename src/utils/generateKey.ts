const generateKey = (): string => {
  return [
    Math.random().toString(16).substring(2, 9),
    Math.random().toString(16).substring(2, 9),
  ].join("");
};

export default generateKey;
