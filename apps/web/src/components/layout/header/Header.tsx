'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { mainNav } from '@/config/navigation'
import { NavigationMenu } from './NavigationMenu'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  transparent?: boolean
}

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 16)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showSolid = !transparent || isScrolled

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          showSolid
            ? 'bg-surface/96 shadow-sm backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="container-premium flex h-16 items-center justify-between gap-6 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm font-display text-lg font-bold tracking-tight"
            aria-label="Jurerê Mais — Página inicial"
          >
            <span
              className={cn(
                'transition-colors duration-300',
                showSolid ? 'text-primary' : 'text-white'
              )}
            >
              Jurerê
            </span>
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-sm font-bold transition-colors duration-300',
                showSolid
                  ? 'bg-accent text-primary'
                  : 'bg-white/20 text-white backdrop-blur-sm'
              )}
            >
              Mais
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block" aria-label="Menu principal">
            <NavigationMenu items={mainNav} transparent={!showSolid} />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/participar"
              className={cn(
                'hidden rounded-full px-4 py-2 text-sm font-semibold transition-all sm:block',
                'bg-accent text-primary hover:bg-accent-dark hover:text-white',
                'focus-visible:ring-2 focus-visible:ring-accent'
              )}
            >
              Participar
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={isMobileMenuOpen}
              className={cn(
                'flex size-9 items-center justify-center rounded-md transition-colors lg:hidden',
                showSolid
                  ? 'text-primary hover:bg-surface-alt'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            items={mainNav}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
