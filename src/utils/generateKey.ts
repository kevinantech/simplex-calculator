const generateKey = (): string => {
  return [Date.now(), Math.random().toString(16).substring(2, 9)].join("");
};

export default generateKey;
