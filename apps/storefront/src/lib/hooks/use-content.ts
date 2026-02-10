/**
 * Content Hooks - Blog, Announcements, Events, Help, Venues
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { contentService } from "@/lib/mock/content"

// Query Keys
export const contentKeys = {
  all: ["content"] as const,
  // Blog
  blogPosts: (options?: object) => [...contentKeys.all, "blog", options] as const,
  blogPost: (slug: string) => [...contentKeys.all, "blog", slug] as const,
  blogCategories: () => [...contentKeys.all, "blog", "categories"] as const,
  // Announcements
  announcements: (options?: object) => [...contentKeys.all, "announcements", options] as const,
  // Events
  events: (options?: object) => [...contentKeys.all, "events", options] as const,
  event: (slug: string) => [...contentKeys.all, "event", slug] as const,
  // Venues
  venues: (options?: object) => [...contentKeys.all, "venues", options] as const,
  venue: (slug: string) => [...contentKeys.all, "venue", slug] as const,
  // Help
  helpCategories: () => [...contentKeys.all, "help", "categories"] as const,
  helpCategory: (slug: string) => [...contentKeys.all, "help", "category", slug] as const,
  helpArticles: (categoryId?: string) => [...contentKeys.all, "help", "articles", categoryId] as const,
  helpArticle: (slug: string) => [...contentKeys.all, "help", "article", slug] as const,
  helpSearch: (query: string) => [...contentKeys.all, "help", "search", query] as const,
  faqs: (category?: string) => [...contentKeys.all, "faqs", category] as const,
}

// ==================== BLOG ====================

export function useBlogPosts(options?: { category?: string; tag?: string; limit?: number; featured?: boolean }) {
  return useQuery({
    queryKey: contentKeys.blogPosts(options),
    queryFn: () => contentService.getBlogPosts(options),
  })
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: contentKeys.blogPost(slug),
    queryFn: () => contentService.getBlogPost(slug),
    enabled: !!slug,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: contentKeys.blogCategories(),
    queryFn: () => contentService.getBlogCategories(),
  })
}

// ==================== ANNOUNCEMENTS ====================

export function useAnnouncements(options?: { type?: string; active?: boolean }) {
  return useQuery({
    queryKey: contentKeys.announcements(options),
    queryFn: () => contentService.getAnnouncements(options),
  })
}

export function useDismissAnnouncement() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (announcementId: string) => contentService.dismissAnnouncement(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.announcements() })
    },
  })
}

// ==================== EVENTS ====================

export function useEvents(options?: { type?: string; upcoming?: boolean; featured?: boolean; limit?: number }) {
  return useQuery({
    queryKey: contentKeys.events(options),
    queryFn: () => contentService.getEvents(options),
  })
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: contentKeys.event(slug),
    queryFn: () => contentService.getEvent(slug),
    enabled: !!slug,
  })
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ eventId, customerId }: { eventId: string; customerId: string }) =>
      contentService.registerForEvent(eventId, customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.events() })
    },
  })
}

// ==================== VENUES ====================

export function useVenues(options?: { type?: string; city?: string; featured?: boolean }) {
  return useQuery({
    queryKey: contentKeys.venues(options),
    queryFn: () => contentService.getVenues(options),
  })
}

export function useVenue(slug: string) {
  return useQuery({
    queryKey: contentKeys.venue(slug),
    queryFn: () => contentService.getVenue(slug),
    enabled: !!slug,
  })
}

export function useNearestVenue(lat?: number, lng?: number) {
  return useQuery({
    queryKey: [...contentKeys.all, "nearest-venue", lat, lng] as const,
    queryFn: () => contentService.findNearestVenue(lat!, lng!),
    enabled: !!lat && !!lng,
  })
}

// ==================== HELP ====================

export function useHelpCategories() {
  return useQuery({
    queryKey: contentKeys.helpCategories(),
    queryFn: () => contentService.getHelpCategories(),
  })
}

export function useHelpCategory(slug: string) {
  return useQuery({
    queryKey: contentKeys.helpCategory(slug),
    queryFn: () => contentService.getHelpCategory(slug),
    enabled: !!slug,
  })
}

export function useHelpArticles(categoryId?: string) {
  return useQuery({
    queryKey: contentKeys.helpArticles(categoryId),
    queryFn: () => contentService.getHelpArticles(categoryId),
  })
}

export function useHelpArticle(slug: string) {
  return useQuery({
    queryKey: contentKeys.helpArticle(slug),
    queryFn: () => contentService.getHelpArticle(slug),
    enabled: !!slug,
  })
}

export function useSearchHelp(query: string) {
  return useQuery({
    queryKey: contentKeys.helpSearch(query),
    queryFn: () => contentService.searchHelp(query),
    enabled: query.length >= 2,
  })
}

export function useMarkArticleHelpful() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ articleId, helpful }: { articleId: string; helpful: boolean }) =>
      contentService.markArticleHelpful(articleId, helpful),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...contentKeys.all, "help"] })
    },
  })
}

// ==================== FAQ ====================

export function useFAQs(category?: string) {
  return useQuery({
    queryKey: contentKeys.faqs(category),
    queryFn: () => contentService.getFAQs(category),
  })
}
