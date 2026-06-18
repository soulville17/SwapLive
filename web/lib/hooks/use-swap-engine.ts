'use client'
import { useState, useEffect, useCallback } from 'react'

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || 'http://127.0.0.1:8765'
const WS_URL = ENGINE_URL.replace('http', 'ws') + '/ws/stats'

export interface SwapStats {
  fps: number
  latency: number
  pointsConsumed: number
}

export function useSwapEngine() {
  const [isConnected, setIsConnected] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [stats, setStats] = useState<SwapStats>({ fps: 0, latency: 0, pointsConsumed: 0 })
  const [gpuInfo, setGpuInfo] = useState('')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`${ENGINE_URL}/api/status`)
        if (res.ok) {
          const data = await res.json()
          setIsConnected(true)
          setIsRunning(data.running)
          setGpuInfo(data.gpu)
        }
      } catch {
        setIsConnected(false)
      }
    }
    checkConnection()
    const interval = setInterval(checkConnection, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isConnected) return
    const ws = new WebSocket(WS_URL)
    ws.onmessage = (e) => setStats(JSON.parse(e.data))
    return () => ws.close()
  }, [isConnected])

  const startSwap = useCallback(async (avatarPath: string, options: Record<string, unknown>) => {
    const res = await fetch(`${ENGINE_URL}/api/swap/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar_path: avatarPath, ...options }),
    })
    if (res.ok) setIsRunning(true)
  }, [])

  const stopSwap = useCallback(async () => {
    await fetch(`${ENGINE_URL}/api/swap/stop`, { method: 'POST' })
    setIsRunning(false)
  }, [])

  return { isConnected, isRunning, stats, gpuInfo, startSwap, stopSwap }
}
