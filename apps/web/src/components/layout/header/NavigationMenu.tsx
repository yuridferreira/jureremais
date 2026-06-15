'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import type { NavItem } from '@/config/navigation'

interface NavigationMenuProps {
  items: NavItem[]
  transparent?: boolean
}

export function NavigationMenu({ items, transparent }: NavigationMenuProps) {
  const pathname = usePathname()
  const [openItem, setOpenItem] = useState<string | null>(null)

  const textClass = transparent
    ? 'text-white/90 hover:text-white'
    : 'text-muted hover:text-primary'

  return (
    <ul className="flex items-center gap-1" role="menubar">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const hasChildren = item.children && item.children.length > 0
        const isOpen = openItem === item.label

        return (
          <li key={item.href} role="none" className="relative">
            {hasChildren ? (
              <>
                <button
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                  onBlur={() => setTimeout(() => setOpenItem(null), 150)}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    textClass,
                    isActive && 'text-accent-text font-semibold'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-1 min-w-[180px] rounded-xl border border-border bg-surface p-1 shadow-lg"
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        onClick={() => setOpenItem(null)}
                        className={cn(
                          'block rounded-lg px-3 py-2 text-sm text-muted transition-colors',
                          'hover:bg-surface-alt hover:text-primary',
                          pathname === child.href && 'text-accent-text font-medium'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                role="menuitem"
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  textClass,
                  isActive && 'text-accent-text font-semibold'
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
