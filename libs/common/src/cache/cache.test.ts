import { describe, test, expect, vi } from 'vitest'
import { cacheResults } from './cache'
import { Temporal } from '../polyfill'
import { sleep } from '../promise'

describe('cache', () => {
  describe('cacheResults', () => {
    test('it should cache results of sync functions for the specified duration', () => {
      vi.useFakeTimers({ now: 0 })

      const fn = vi.fn((foo: string, bar: number) => `${foo}${bar}`)
      const cachedFn = cacheResults(fn, { duration: Temporal.Duration.from({ minutes: 1 }) })

      expect(fn).toHaveBeenCalledTimes(0)

      expect(cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      expect(cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      vi.setSystemTime(30_000)

      expect(cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      vi.setSystemTime(90_000)

      expect(cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(2)

      vi.restoreAllMocks()
    })

    test('it should cache results of async functions for the specified duration', async () => {
      vi.useFakeTimers({ now: 0, shouldAdvanceTime: true })

      const fn = vi.fn(async (foo: string, bar: number) => {
        await sleep(1)
        return `${foo}${bar}`
      })
      const cachedFn = cacheResults(fn, { duration: Temporal.Duration.from({ minutes: 1 }) })

      expect(fn).toHaveBeenCalledTimes(0)

      expect(await cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      expect(await cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      vi.setSystemTime(30_000)

      expect(await cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(1)

      vi.setSystemTime(90_000)

      expect(await cachedFn('hello', 42)).toEqual('hello42')
      expect(fn).toHaveBeenCalledTimes(2)

      vi.restoreAllMocks()
    })
  })
})
