import * as React from "react"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { clx } from "@medusajs/ui"

interface InstagramPost {
  id: string
  image: string
  caption?: string
  likes?: number
  comments?: number
  link: string
}

interface InstagramFeedProps {
  posts: InstagramPost[]
  username: string
  columns?: 3 | 4 | 5 | 6
  gap?: "sm" | "md" | "lg"
  showStats?: boolean
  className?: string
}

export function InstagramFeed({
  posts,
  username,
  columns = 4,
  gap = "md",
  showStats = true,
  className
}: InstagramFeedProps) {
  const gapClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-4"
  }

  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    6: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6"
  }

  return (
    <div className={clx("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <a
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              @{username}
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-zinc-500 text-sm">Follow us on Instagram</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={clx("grid", gridCols[columns], gapClasses[gap])}>
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-800"
          >
            <img
              src={post.image}
              alt={post.caption || "Instagram post"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {showStats && (post.likes !== undefined || post.comments !== undefined) ? (
                <div className="flex items-center gap-4 text-white">
                  {post.likes !== undefined && (
                    <span className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-current" />
                      {formatNumber(post.likes)}
                    </span>
                  )}
                  {post.comments !== undefined && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5 fill-current" />
                      {formatNumber(post.comments)}
                    </span>
                  )}
                </div>
              ) : (
                <Instagram className="w-8 h-8 text-white" />
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

interface InstagramCTAProps {
  username: string
  followerCount?: number
  className?: string
}

export function InstagramCTA({ username, followerCount, className }: InstagramCTAProps) {
  return (
    <a
      href={`https://instagram.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={clx(
        "flex items-center gap-4 p-4 rounded-xl transition-all",
        "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10",
        "border border-pink-500/20 hover:border-pink-500/40",
        className
      )}
    >
      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
        <Instagram className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">@{username}</p>
        {followerCount && (
          <p className="text-zinc-400 text-sm">{formatNumber(followerCount)} followers</p>
        )}
      </div>
      <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium text-sm">
        Follow
      </span>
    </a>
  )
}
