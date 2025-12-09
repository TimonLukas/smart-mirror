import { Temporal } from '../polyfill'
import { isThenable } from '../promise'

type CacheResultsOptions = {
  argsToKey: (...args: any[]) => string
  duration: Temporal.Duration
}
const defaultCacheResultsOptions: CacheResultsOptions = {
  argsToKey: (...args) => JSON.stringify(args),
  duration: Temporal.Duration.from({ seconds: 0 }),
}

export function cacheResults<Args extends any[], Result>(
  fn: (...args: Args) => Result,
  options: Partial<CacheResultsOptions> = {},
): (...args: Args) => Result {
  const mergedOptions = Object.assign({}, defaultCacheResultsOptions, options)

  const cache = new Map<
    string,
    {
      lastUpdate: Temporal.Instant
      value: any
    }
  >()

  return (...args) => {
    const key = mergedOptions.argsToKey(args)
    const cacheEntry = cache.get(key)

    if (typeof cacheEntry !== 'undefined') {
      const durationSinceLastUpdate = Temporal.Now.instant().since(cacheEntry.lastUpdate)

      if (Temporal.Duration.compare(mergedOptions.duration, durationSinceLastUpdate) !== -1) {
        return cacheEntry.value
      }
    }

    const result = fn(...args)
    if (isThenable(result)) {
      return result.then((value) => {
        cache.set(key, {
          lastUpdate: Temporal.Now.instant(),
          value,
        })

        return value
      })
    }

    cache.set(key, {
      lastUpdate: Temporal.Now.instant(),
      value: result,
    })
    return result
  }
}
