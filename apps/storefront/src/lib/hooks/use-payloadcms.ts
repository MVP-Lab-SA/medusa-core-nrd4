/**
 * PayloadCMS Hooks - Content & Configuration
 */

import { useQuery } from "@tanstack/react-query"
import { payloadcmsService } from "@/lib/mock/payloadcms"
import type { Banner, VenueProfile } from "@/lib/mock/payloadcms"

// Query Keys
export const payloadcmsKeys = {
  all: ["payloadcms"] as const,
  page: (slug: string) => [...payloadcmsKeys.all, "page", slug] as const,
  blogPosts: (options?: { category?: string; tag?: string }) =>
    [...payloadcmsKeys.all, "blog", options] as const,
  blogPost: (slug: string) => [...payloadcmsKeys.all, "blog", slug] as const,
  blogCategories: () => [...payloadcmsKeys.all, "blog", "categories"] as const,
  faqs: (category?: string) => [...payloadcmsKeys.all, "faqs", category] as const,
  faqCategories: () => [...payloadcmsKeys.all, "faqs", "categories"] as const,
  announcements: () => [...payloadcmsKeys.all, "announcements"] as const,
  events: (options?: { category?: string; upcoming?: boolean }) =>
    [...payloadcmsKeys.all, "events", options] as const,
  event: (slug: string) => [...payloadcmsKeys.all, "event", slug] as const,
  services: (category?: string) => [...payloadcmsKeys.all, "services", category] as const,
  service: (slug: string) => [...payloadcmsKeys.all, "service", slug] as const,
  venues: (type?: VenueProfile["type"]) => [...payloadcmsKeys.all, "venues", type] as const,
  venue: (slug: string) => [...payloadcmsKeys.all, "venue", slug] as const,
  navigation: (name: string) => [...payloadcmsKeys.all, "nav", name] as const,
  banners: (type?: Banner["type"]) => [...payloadcmsKeys.all, "banners", type] as const,
}

// Pages
export function usePage(slug: string) {
  return useQuery({
    queryKey: payloadcmsKeys.page(slug),
    queryFn: () => payloadcmsService.getPage(slug),
    enabled: !!slug,
  })
}

// Blog
export function useBlogPosts(options?: {
  category?: string
  tag?: string
  limit?: number
  offset?: number
}) {
  return useQuery({
    queryKey: payloadcmsKeys.blogPosts(options),
    queryFn: () => payloadcmsService.getBlogPosts(options),
  })
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: payloadcmsKeys.blogPost(slug),
    queryFn: () => payloadcmsService.getBlogPost(slug),
    enabled: !!slug,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: payloadcmsKeys.blogCategories(),
    queryFn: () => payloadcmsService.getBlogCategories(),
  })
}

// FAQ
export function useFAQs(category?: string) {
  return useQuery({
    queryKey: payloadcmsKeys.faqs(category),
    queryFn: () => payloadcmsService.getFAQs(category),
  })
}

export function useFAQCategories() {
  return useQuery({
    queryKey: payloadcmsKeys.faqCategories(),
    queryFn: () => payloadcmsService.getFAQCategories(),
  })
}

// Announcements
export function useActiveAnnouncements() {
  return useQuery({
    queryKey: payloadcmsKeys.announcements(),
    queryFn: () => payloadcmsService.getActiveAnnouncements(),
    refetchInterval: 60000, // Check for new announcements every minute
  })
}

// Events
export function useEvents(options?: { category?: string; upcoming?: boolean; limit?: number }) {
  return useQuery({
    queryKey: payloadcmsKeys.events(options),
    queryFn: () => payloadcmsService.getEvents(options),
  })
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: payloadcmsKeys.event(slug),
    queryFn: () => payloadcmsService.getEvent(slug),
    enabled: !!slug,
  })
}

// City Services
export function useCityServices(category?: string) {
  return useQuery({
    queryKey: payloadcmsKeys.services(category),
    queryFn: () => payloadcmsService.getServices(category),
  })
}

export function useCityService(slug: string) {
  return useQuery({
    queryKey: payloadcmsKeys.service(slug),
    queryFn: () => payloadcmsService.getService(slug),
    enabled: !!slug,
  })
}

// Venues
export function useVenues(type?: VenueProfile["type"]) {
  return useQuery({
    queryKey: payloadcmsKeys.venues(type),
    queryFn: () => payloadcmsService.getVenues({ type }),
  })
}

export function useVenue(slug: string) {
  return useQuery({
    queryKey: payloadcmsKeys.venue(slug),
    queryFn: () => payloadcmsService.getVenue(slug),
    enabled: !!slug,
  })
}

// Navigation
export function useNavigation(name: string) {
  return useQuery({
    queryKey: payloadcmsKeys.navigation(name),
    queryFn: () => payloadcmsService.getNavigation(name),
    enabled: !!name,
  })
}

// Banners
export function useBanners(type?: Banner["type"]) {
  return useQuery({
    queryKey: payloadcmsKeys.banners(type),
    queryFn: () => payloadcmsService.getBanners(type),
  })
}
