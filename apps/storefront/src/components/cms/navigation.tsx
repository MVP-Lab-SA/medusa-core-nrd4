/**
 * CMS Navigation Components
 * 
 * Renders navigation from Payload CMS.
 * Supports header, footer, mobile, and megamenu patterns.
 */

import React from 'react';
import { Link } from '@tanstack/react-router';
import type { Navigation, NavigationItem } from '@/lib/payload/types';

// =============================================================================
// NAVIGATION ITEM RENDERER
// =============================================================================

interface NavItemProps {
  item: NavigationItem;
  level?: number;
  className?: string;
}

function resolveItemUrl(item: NavigationItem): string {
  if (item.url) return item.url;
  
  // Resolve linked content
  if (item.page && typeof item.page !== 'string') {
    return `/${item.page.slug}`;
  }
  if (item.poi && typeof item.poi !== 'string') {
    return `/poi/${item.poi.slug}`;
  }
  if (item.node && typeof item.node !== 'string') {
    return `/explore/${item.node.slug}`;
  }
  
  return '#';
}

export function NavItem({ item, level = 0, className = '' }: NavItemProps) {
  const url = resolveItemUrl(item);
  const hasChildren = item.children && item.children.length > 0;
  const isExternal = url.startsWith('http');

  // Simple link
  if (!hasChildren) {
    if (isExternal) {
      return (
        <a
          href={url}
          target={item.target || '_blank'}
          rel="noopener noreferrer"
          className={className}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </a>
      );
    }

    return (
      <Link to={url} className={className}>
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </Link>
    );
  }

  // Dropdown/Megamenu - render with children
  return (
    <div className="relative group">
      <button className={`flex items-center gap-1 ${className}`}>
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[200px]">
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              level={level + 1}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// HEADER NAVIGATION
// =============================================================================

interface HeaderNavProps {
  navigation: Navigation;
  className?: string;
}

export function HeaderNav({ navigation, className = '' }: HeaderNavProps) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {navigation.items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
        />
      ))}
    </nav>
  );
}

// =============================================================================
// FOOTER NAVIGATION
// =============================================================================

interface FooterNavProps {
  navigation: Navigation;
  className?: string;
}

export function FooterNav({ navigation, className = '' }: FooterNavProps) {
  // Group items by top-level for column layout
  const columns = navigation.items.filter(item => item.children && item.children.length > 0);
  const singleItems = navigation.items.filter(item => !item.children || item.children.length === 0);

  return (
    <nav className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column groups */}
        {columns.map((column) => (
          <div key={column.id}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {column.label}
            </h3>
            <ul className="space-y-2">
              {column.children!.map((item) => (
                <li key={item.id}>
                  <NavItem
                    item={item}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Single items as separate column */}
        {singleItems.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Links
            </h3>
            <ul className="space-y-2">
              {singleItems.map((item) => (
                <li key={item.id}>
                  <NavItem
                    item={item}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

// =============================================================================
// MOBILE NAVIGATION
// =============================================================================

interface MobileNavProps {
  navigation: Navigation;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ navigation, isOpen, onClose }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const next = new Set(expandedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedItems(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-semibold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <ul className="space-y-2">
            {navigation.items.map((item) => (
              <li key={item.id}>
                {item.children && item.children.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center justify-between w-full p-3 text-left font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${expandedItems.has(item.id) ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedItems.has(item.id) && (
                      <ul className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              to={resolveItemUrl(child)}
                              onClick={onClose}
                              className="block p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={resolveItemUrl(item)}
                    onClick={onClose}
                    className="block p-3 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

// =============================================================================
// MEGAMENU
// =============================================================================

interface MegamenuProps {
  items: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function Megamenu({ items, isOpen, onClose }: MegamenuProps) {
  if (!isOpen || items.length === 0) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl z-50"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.id}>
              {/* Column Header */}
              <Link
                to={resolveItemUrl(item)}
                className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors"
              >
                {item.label}
              </Link>

              {/* Featured Image */}
              {item.featured?.image && (
                <div className="mt-4 mb-4 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={item.featured.image.url}
                    alt={item.featured.title || item.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Children */}
              {item.children && item.children.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        to={resolveItemUrl(child)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// UTILITY NAVIGATION (Language, Account, etc.)
// =============================================================================

interface UtilityNavProps {
  navigation: Navigation;
  className?: string;
}

export function UtilityNav({ navigation, className = '' }: UtilityNavProps) {
  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {navigation.items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
        />
      ))}
    </nav>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { NavItemProps, HeaderNavProps, FooterNavProps, MobileNavProps, MegamenuProps };
