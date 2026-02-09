/**
 * CMS Navigation Component
 * 
 * Renders navigation from CMS data with fallback to defaults.
 */

import React from 'react'
import { Link } from '@tanstack/react-router'
import type { NavSection, NavItem, FooterSection, FooterLink } from '@/lib/cms'

// =============================================================================
// MAIN MENU NAVIGATION
// =============================================================================

interface MainMenuProps {
  sections: NavSection[]
  countryCode: string
}

export function MainMenu({ sections, countryCode }: MainMenuProps) {
  if (!sections?.length) return null

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {sections.map((section) => (
        <NavDropdown key={section.id} section={section} countryCode={countryCode} />
      ))}
    </nav>
  )
}

interface NavDropdownProps {
  section: NavSection
  countryCode: string
}

function NavDropdown({ section, countryCode }: NavDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (!section.items?.length) {
    return (
      <span className="text-sm font-medium text-city-gray hover:text-city-white transition-colors">
        {section.label}
      </span>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-sm font-medium text-city-gray hover:text-city-white transition-colors">
        {section.label}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-city-charcoal border border-city-steel rounded-lg shadow-lg py-2 z-50">
          {section.items.map((item) => (
            <NavLink key={item.id} item={item} countryCode={countryCode} />
          ))}
        </div>
      )}
    </div>
  )
}

interface NavLinkProps {
  item: NavItem
  countryCode: string
}

function NavLink({ item, countryCode }: NavLinkProps) {
  const href = item.href.startsWith('/') ? `/${countryCode}${item.href}` : item.href
  const isExternal = item.openInNewTab || item.href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-sm text-city-gray hover:text-city-white hover:bg-city-slate transition-colors"
      >
        {item.label}
        {item.badge && (
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-city-lime text-city-charcoal rounded">
            {item.badge}
          </span>
        )}
      </a>
    )
  }

  return (
    <Link
      to={href as any}
      className="block px-4 py-2 text-sm text-city-gray hover:text-city-white hover:bg-city-slate transition-colors"
    >
      {item.label}
      {item.badge && (
        <span className="ml-2 px-1.5 py-0.5 text-xs bg-city-lime text-city-charcoal rounded">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

// =============================================================================
// FOOTER NAVIGATION
// =============================================================================

interface FooterMenuProps {
  sections: FooterSection[]
  countryCode: string
}

export function FooterMenu({ sections, countryCode }: FooterMenuProps) {
  if (!sections?.length) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {sections.map((section) => (
        <FooterColumn key={section.id} section={section} countryCode={countryCode} />
      ))}
    </div>
  )
}

interface FooterColumnProps {
  section: FooterSection
  countryCode: string
}

function FooterColumn({ section, countryCode }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-city-white mb-4">{section.title}</h3>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.id}>
            <FooterLink link={link} countryCode={countryCode} />
          </li>
        ))}
      </ul>
    </div>
  )
}

interface FooterLinkComponentProps {
  link: FooterLink
  countryCode: string
}

function FooterLink({ link, countryCode }: FooterLinkComponentProps) {
  const href = link.href.startsWith('/') ? `/${countryCode}${link.href}` : link.href
  const isExternal = link.openInNewTab || link.href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-city-gray hover:text-city-white transition-colors"
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link
      to={href as any}
      className="text-sm text-city-gray hover:text-city-white transition-colors"
    >
      {link.label}
    </Link>
  )
}

// =============================================================================
// MOBILE MENU
// =============================================================================

interface MobileMenuProps {
  sections: NavSection[]
  countryCode: string
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ sections, countryCode, isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-city-charcoal p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-city-gray hover:text-city-white"
        >
          Close
        </button>
        <nav className="mt-8 space-y-4">
          {sections.map((section) => (
            <MobileMenuSection
              key={section.id}
              section={section}
              countryCode={countryCode}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

interface MobileMenuSectionProps {
  section: NavSection
  countryCode: string
  onClose: () => void
}

function MobileMenuSection({ section, countryCode, onClose }: MobileMenuSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-2 text-left text-city-white font-medium"
      >
        {section.label}
        <span className="text-city-gray">{isExpanded ? '-' : '+'}</span>
      </button>
      {isExpanded && section.items && (
        <div className="ml-4 space-y-1">
          {section.items.map((item) => (
            <MobileNavLink
              key={item.id}
              item={item}
              countryCode={countryCode}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MobileNavLinkProps {
  item: NavItem
  countryCode: string
  onClose: () => void
}

function MobileNavLink({ item, countryCode, onClose }: MobileNavLinkProps) {
  const href = item.href.startsWith('/') ? `/${countryCode}${item.href}` : item.href

  return (
    <Link
      to={href as any}
      onClick={onClose}
      className="block py-2 text-sm text-city-gray hover:text-city-white"
    >
      {item.label}
    </Link>
  )
}
