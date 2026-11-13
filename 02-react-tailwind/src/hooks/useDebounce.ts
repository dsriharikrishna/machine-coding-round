import { useEffect, useState } from 'react'

/**
 * useDebounce custom hook with TypeScript generics
 *
 * @template T
 * @param {T} value - The input value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {T} - Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

