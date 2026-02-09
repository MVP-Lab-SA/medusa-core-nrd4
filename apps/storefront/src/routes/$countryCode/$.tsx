import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DocumentText, Calendar, ArrowRight, BuildingStorefront } from "@medusajs/icons";

export const Route = createFileRoute("/$countryCode/$")({
  component: DynamicCMSPage,
});

// Mock CMS page data
const mockCMSPages: Record<string, {
  title: string;
  content: ContentBlock[];
  seo: { title: string; description: string };
  template: "default" | "landing" | "article";
  publishedAt: string;
  breadcrumbs: { label: string; href: string }[];
}> = {
  "about-us": {
    title: "About Us",
    template: "default",
    publishedAt: "2024-01-01",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
    ],
    seo: {
      title: "About Us | City Commerce",
      description: "Learn about our story, mission, and the team behind City Commerce.",
    },
    content: [
      {
        type: "hero",
        data: {
          title: "Our Story",
          subtitle: "Building the future of city commerce since 2020",
          image: "/placeholder-hero.jpg",
        },
      },
      {
        type: "text",
        data: {
          content: "City Commerce was founded with a simple mission: to connect local businesses with their communities through technology. We believe in the power of local commerce to transform neighborhoods and create thriving communities.",
        },
      },
      {
        type: "stats",
        data: {
          items: [
            { label: "Local Vendors", value: "500+" },
            { label: "Happy Customers", value: "50,000+" },
            { label: "Cities Served", value: "25" },
            { label: "Orders Delivered", value: "1M+" },
          ],
        },
      },
      {
        type: "text",
        data: {
          content: "Our platform brings together the best local vendors, seamless delivery logistics, and a world-class customer experience. Whether you are shopping for artisanal goods, booking local services, or supporting neighborhood businesses, City Commerce makes it easy.",
        },
      },
    ],
  },
  "careers": {
    title: "Careers",
    template: "default",
    publishedAt: "2024-01-01",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Careers", href: "/careers" },
    ],
    seo: {
      title: "Careers | City Commerce",
      description: "Join our team and help build the future of local commerce.",
    },
    content: [
      {
        type: "hero",
        data: {
          title: "Join Our Team",
          subtitle: "Help us build the future of local commerce",
          image: "/placeholder-careers.jpg",
        },
      },
      {
        type: "text",
        data: {
          content: "We are always looking for talented individuals who share our passion for local commerce and community building. Check out our open positions below.",
        },
      },
      {
        type: "jobs",
        data: {
          items: [
            { title: "Senior Software Engineer", department: "Engineering", location: "Remote" },
            { title: "Product Designer", department: "Design", location: "New York" },
            { title: "Operations Manager", department: "Operations", location: "Chicago" },
            { title: "Customer Success Lead", department: "Support", location: "Remote" },
          ],
        },
      },
    ],
  },
  "press": {
    title: "Press & Media",
    template: "default",
    publishedAt: "2024-01-01",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Press", href: "/press" },
    ],
    seo: {
      title: "Press & Media | City Commerce",
      description: "Latest news, press releases, and media resources from City Commerce.",
    },
    content: [
      {
        type: "hero",
        data: {
          title: "Press & Media",
          subtitle: "News and updates from City Commerce",
          image: "/placeholder-press.jpg",
        },
      },
      {
        type: "press_releases",
        data: {
          items: [
            { title: "City Commerce Raises $50M Series B", date: "2024-01-15", outlet: "TechCrunch" },
            { title: "Expanding to 10 New Cities", date: "2024-01-10", outlet: "Forbes" },
            { title: "Partnership with Local Business Alliance", date: "2024-01-05", outlet: "Bloomberg" },
          ],
        },
      },
    ],
  },
};

type ContentBlock = {
  type: string;
  data: Record<string, unknown>;
};

function DynamicCMSPage() {
  const { _splat } = Route.useParams();
  const slug = _splat || "";
  const [page, setPage] = useState<typeof mockCMSPages[string] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const pageData = mockCMSPages[slug];
      setPage(pageData || null);
      setLoading(false);
    }, 300);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <DocumentText className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6 text-center">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <BuildingStorefront className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            {page.breadcrumbs.map((crumb, idx) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400">/</span>}
                {idx === page.breadcrumbs.length - 1 ? (
                  <span className="text-gray-900">{crumb.label}</span>
                ) : (
                  <a href={crumb.href} className="text-gray-500 hover:text-gray-900">
                    {crumb.label}
                  </a>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {page.content.map((block, idx) => (
          <ContentBlockRenderer key={idx} block={block} />
        ))}
      </div>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "hero":
      return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-12 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{block.data.title as string}</h1>
          <p className="text-xl text-gray-300">{block.data.subtitle as string}</p>
        </div>
      );

    case "text":
      return (
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-600 leading-relaxed">{block.data.content as string}</p>
        </div>
      );

    case "stats":
      const statsItems = block.data.items as { label: string; value: string }[];
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {statsItems.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      );

    case "jobs":
      const jobItems = block.data.items as { title: string; department: string; location: string }[];
      return (
        <div className="space-y-4 mb-8">
          {jobItems.map((job) => (
            <div
              key={job.title}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.department} - {job.location}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      );

    case "press_releases":
      const pressItems = block.data.items as { title: string; date: string; outlet: string }[];
      return (
        <div className="space-y-4 mb-8">
          {pressItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between p-4 border rounded-xl hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span>{item.outlet}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
