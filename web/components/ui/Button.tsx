import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
    const variants = {
      primary: 'btn-primary text-white px-6 py-2.5',
      outline: 'btn-outline px-6 py-2.5',
      ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 px-4 py-2',
      danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-6 py-2.5',
    }
    const sizes = { sm: 'text-sm px-4 py-2', md: 'text-sm px-6 py-2.5', lg: 'text-base px-8 py-3' }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export { Button }
