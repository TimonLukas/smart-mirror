type Thenable = {
  then(onfulfilled: (...args: any[]) => any): any
}

export function isThenable(value: unknown): value is Thenable {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return 'then' in value && typeof value.then === 'function'
}
