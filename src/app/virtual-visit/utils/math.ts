export const isEqual = (x: number, y: number, epsilon = 10e-3) => {
  return Math.abs(x - y) <= epsilon;
}