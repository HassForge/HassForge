export const clamp = (
  n: number,
  min: number = 0,
  max: number = 0.9999999999
) => {
  return Math.min(Math.max(n, min), max);
};
