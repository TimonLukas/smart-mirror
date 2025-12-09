export function isNot<T>(
  value: T | null,
  name: string,
  formatMessage: (name: string) => string = (name) => `expected ${name} to not be null, got: null`,
): asserts value is T {
  if (value === null) {
    throw new Error(formatMessage(name))
  }
}
