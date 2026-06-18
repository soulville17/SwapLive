import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'pro' | 'new' | 'default'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    live: 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30',
    pro: 'bg-[#7b2fff]/10 text-[#7b2fff] border-[#7b2fff]/30',
    new: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/30',
    default: 'bg-white/5 text-[var(--text-secondary)] border-white/10',
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-full', variants[variant], className)} {...props}>
      {variant === 'live' && <span className="badge-live" />}
      {children}
    </span>
  )
}
