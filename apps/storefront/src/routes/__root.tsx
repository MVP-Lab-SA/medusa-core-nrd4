import Layout from "@/components/layout"
import { listRegions } from "@/lib/data/regions"
import { CityOSProvider } from "@/lib/cityos"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { lazy } from "react"
import appCss from "../styles/app.css?url"

const NotFound = lazy(() => import("@/components/not-found"))

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: async ({ context }) => {
    const { queryClient } = context
    
    // Pre-populate regions cache
    await queryClient.ensureQueryData({
      queryKey: ["regions"],
      queryFn: () => listRegions({ fields: "id, name, currency_code, *countries" }),
    })
    
    return {}
  },
  head: () => ({
    links: [
      { rel: "icon", href: "/images/medusa.svg" },
      { rel: "stylesheet", href: appCss },
    ],
    meta: [
      { title: "Medusa Storefront" },
      { charSet: "UTF-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
    scripts: [],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
})

function RootComponent() {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <CityOSProvider
            tenant="platform"
            fallbackToDefault={true}
            config={{
              baseUrl: import.meta.env.VITE_CITYOS_API_URL || 'https://9e78ac41-ae95-440f-9196-e9263c6eadda-00-130jbk279zua2.janeway.replit.dev',
              channel: 'storefront',
              enableCache: true,
            }}
          >
            <Layout />
          </CityOSProvider>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  )
}
