/**
 * Link utility for dynamic routes
 * 
 * TanStack Router has strict type checking for routes, but we often need to
 * construct dynamic paths at runtime. This utility helps bypass the strict
 * type checking when needed.
 */

/**
 * Cast a dynamic path string for use with TanStack Router Link component.
 * Use this when you need to construct paths with variables that TypeScript
 * can't statically verify.
 * 
 * @example
 * <Link to={href(`/${countryCode}/products/${handle}`)}>View Product</Link>
 */
export function href(path: string): any {
  return path
}

/**
 * Build a path with the country code prefix
 */
export function localePath(countryCode: string, path: string): any {
  return `/${countryCode}${path.startsWith('/') ? path : '/' + path}`
}
