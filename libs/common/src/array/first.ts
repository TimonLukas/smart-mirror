/**
 * Returns the first non-NaN value passed. If all values are NaN, returns 0.
 */
export function firstNotNan(...values: number[]): number {
  for (const value of values) {
    if (!Number.isNaN(value)) {
      return value
    }
  }

  return 0
}
