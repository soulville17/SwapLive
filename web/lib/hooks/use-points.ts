'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

export function usePoints(initialBalance = 847) {
  const [balance, setBalance] = useState(initialBalance)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startConsuming = useCallback(() => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setBalance(b => {
        if (b <= 0) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          return 0
        }
        return b - 1
      })
    }, 1000)
  }, [])

  const stopConsuming = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }, [])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const percentage = Math.round((balance / initialBalance) * 100)
  const alertLevel = balance === 0 ? 'empty' : percentage <= 10 ? 'critical' : percentage <= 30 ? 'low' : 'ok'
  const estimatedMinutes = Math.floor(balance / 60)

  return { balance, isRunning, percentage, alertLevel, estimatedMinutes, startConsuming, stopConsuming, setBalance }
}
