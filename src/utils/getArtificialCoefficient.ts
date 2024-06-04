export const M = "M";

export const getArtificialCoefficientM = (coefficient: number): string | 0 => {
  if (coefficient === 1) return M;
  if (coefficient === -1) return "-" + M;
  if (coefficient !== 0) return coefficient + M;
  return coefficient;
};
