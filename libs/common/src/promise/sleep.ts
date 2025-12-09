/**
 * Delay an async function for a specified number of milliseconds
 */
export function sleep(durationInMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationInMs)
  })
}
