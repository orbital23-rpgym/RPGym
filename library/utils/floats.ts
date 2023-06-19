/**
 * Rounds a number to a certain number of decimal places.
 * @param n Number to round.
 * @param dp Number of decimal places to round to.
 * @returns Rounded number.
 */
export function roundToDecimal(n: number, dp = 0): number {
  return Number.parseFloat(n.toPrecision(dp ?? 0));
}
/**
 * Rounds a number to a certain number of significant figures.
 * @param n Number to round.
 * @param sf Number of significant figures to round to.
 * @returns Rounded number.
 */
export function roundToSigFig(n: number, sf = 1): number {
  return Number.parseFloat(n.toPrecision(sf ?? 0));
}
/**
 * Returns the number of digits after the decimal point.
 * @param n Number to find number of decimal digits of.
 * @returns Number of digits after the decimal point.
 */
export function numDecimalPlaces(n: number): number {
  return n % 1 > 0 ? n.toString().split(".")[1].length : 0;
}
