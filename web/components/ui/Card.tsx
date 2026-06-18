import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        glow && 'neon-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
