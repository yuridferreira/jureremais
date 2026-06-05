'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/config/navigation'

interface MobileMenuProps {
  items: NavItem[]
  onClose: () => void
}

export function MobileMenu({ items, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col bg-surface dark:bg-dark-surface shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4 dark:border-white/10">
          <span className="font-display font-bold text-primary dark:text-white">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-alt dark:hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-4" aria-label="Menu mobile">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const hasChildren = item.children && item.children.length > 0
              const isOpen = openItem === item.label

              return (
                <li key={item.href}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => setOpenItem(isOpen ? null : item.label)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-accent/10 text-accent'
                            : 'text-text hover:bg-surface-alt dark:text-white dark:hover:bg-white/5'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
                        />
                      </button>
                      {isOpen && (
                        <ul className="ml-3 mt-1 space-y-1 border-l-2 border-border pl-3 dark:border-white/10">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className={cn(
                                  'block rounded-md px-3 py-2 text-sm transition-colors',
                                  pathname === child.href
                                    ? 'text-accent font-medium'
                                    : 'text-muted hover:text-text dark:hover:text-white'
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent/10 text-accent'
                          : 'text-text hover:bg-surface-alt dark:text-white dark:hover:bg-white/5'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA bottom */}
        <div className="border-t border-border p-4 dark:border-white/10">
          <Link
            href="/participar"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full bg-accent py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Participar do movimento
          </Link>
        </div>
      </motion.div>
    </>
  )
}
