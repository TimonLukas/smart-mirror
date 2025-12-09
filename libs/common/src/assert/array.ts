export function hasMinLength(
  minLength: number,
  formatMessage: (name: string, expected: number, actual: number) => string = (
    name,
    expected,
    actual,
  ) => `expected ${name} to have length >= ${expected}, got: ${actual}`,
): (value: unknown[], name: string) => void {
  return (value, name) => {
    if (value.length < minLength) {
      throw new Error(formatMessage(name, minLength, value.length))
    }
  }
}
