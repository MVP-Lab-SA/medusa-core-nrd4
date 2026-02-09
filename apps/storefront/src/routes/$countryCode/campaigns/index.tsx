import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowRight, User, Check } from "@medusajs/icons"
import { useCampaigns } from "../../../lib/hooks/use-commerce-models"

export const Route = createFileRoute("/$countryCode/campaigns/")({
  component: CampaignsPage,
})

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const percentage = Math.min((raised / goal) * 100, 100)
  return (
    <div className="relative h-2 bg-city-navy/50 rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

function CampaignsPage() {
  const { countryCode } = Route.useParams()
  const { data: campaigns, isLoading } = useCampaigns()
  const [filter, setFilter] = useState<"all" | "active" | "funded">("all")
  const [category, setCategory] = useState<string>("all")

  const filteredCampaigns = campaigns?.filter(c => {
    if (filter !== "all" && c.status !== filter) return false
    if (category !== "all" && c.category !== category) return false
    return true
  })

  const categories = ["all", "charity", "community", "education", "environment", "innovation"]

  return (
    <div className="min-h-screen bg-city-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-city-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
              <span className="text-green-400 text-sm font-medium">Community Powered</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Support Smart Home Initiatives
            </h1>
            <p className="text-xl text-city-gray mb-8">
              Back campaigns that bring smart home technology to communities, 
              support education, and drive innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "funded", label: "Funded" },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={`px-4 py-2 rounded-full transition-all ${
                  filter === f.value
                    ? "bg-green-500 text-white font-semibold"
                    : "bg-city-slate/30 text-city-gray hover:bg-city-slate/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-city-slate/50" />
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm transition-all capitalize ${
                  category === cat
                    ? "bg-city-cyan text-city-navy font-semibold"
                    : "bg-city-slate/30 text-city-gray hover:bg-city-slate/50"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-city-slate/30 rounded-xl h-[450px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns?.map(campaign => (
              <Link
                key={campaign.id}
                to="/$countryCode/campaigns/$handle"
                params={{ countryCode, handle: campaign.handle }}
                className="group bg-city-slate/30 border border-city-slate/50 rounded-xl overflow-hidden hover:border-green-500/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={campaign.images[0]}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {campaign.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                  {campaign.status === "funded" && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      <Check className="w-3 h-3" />
                      Funded
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <span className="text-green-400 text-sm font-medium capitalize">{campaign.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-city-gray text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  {/* Progress */}
                  <div className="mb-4">
                    <ProgressBar raised={campaign.raised} goal={campaign.goal} />
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-white font-semibold">
                        ${campaign.raised.toLocaleString()}
                      </span>
                      <span className="text-city-gray">
                        of ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-city-gray">
                      <User className="w-4 h-4" />
                      <span>{campaign.backerCount} backers</span>
                    </div>
                    <span className="text-green-400">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                    </span>
                  </div>
                  
                  {/* Organizer */}
                  <div className="mt-4 pt-4 border-t border-city-slate/50 flex items-center gap-2">
                    <div className="w-6 h-6 bg-city-cyan/20 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-city-cyan" />
                    </div>
                    <span className="text-city-gray text-sm">
                      by {campaign.organizer.name}
                      {campaign.organizer.verified && (
                        <Check className="w-4 h-4 text-city-cyan inline ml-1" />
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
