'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils/cn'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
  valueClassName?: string
  labelClassName?: string
  label?: string
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
  className,
  valueClassName,
  labelClassName,
  label,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ triggerOnce: true })
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    startTimeRef.current = null

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setDisplayValue(easedProgress * value)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isInView, value, duration])

  const formatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(displayValue)

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)}>
      <span className={cn('font-display font-bold tabular-nums', valueClassName)}>
        {prefix}{formatted}{suffix}
      </span>
      {label && <span className={cn('mt-1', labelClassName)}>{label}</span>}
    </div>
  )
}
