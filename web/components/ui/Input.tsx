import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-lg bg-white/5 border border-[rgba(0,212,255,0.08)] text-[#f0f0ff] placeholder-[#44445a] text-sm',
        'focus:outline-none focus:border-[rgba(0,212,255,0.4)] focus:bg-white/8 transition-all duration-200',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
export { Input }
