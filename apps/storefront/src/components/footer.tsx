import CountrySelect from "@/components/country-select"
import { Newsletter } from "@/components/newsletter"
import { useCategories } from "@/lib/hooks/use-categories"
import { useRegions } from "@/lib/hooks/use-regions"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { Link, useLocation } from "@tanstack/react-router"

const Footer = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

  const { data: categories } = useCategories({
    fields: "name,handle",
    queryParams: {
      parent_category_id: "null",
      limit: 3,
    },
  })

  const { data: regions } = useRegions({
    fields: "id, currency_code, *countries",
  })

  return (
    <footer
      className="bg-city-navy border-t border-city-steel/30 w-full"
      data-testid="footer"
    >
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 lg:flex-row items-start justify-between py-16">
          {/* Brand column */}
          <div className="lg:w-1/4 flex flex-col gap-y-6">
            <Link
              to="/$countryCode"
              params={{ countryCode }}
              className="text-2xl font-bold text-city-white hover:text-city-cyan transition-colors w-fit tracking-tight"
            >
              DAKKAH<span className="text-city-cyan">.</span>
            </Link>
            <p className="text-city-gray max-w-md text-base leading-relaxed">
              Precision infrastructure for smart cities. Powering Saudi Arabia's urban transformation with cutting-edge IoT technology.
            </p>
            <CountrySelect regions={regions ?? []} />
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {/* Shop */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Shop
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/store"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/vendors"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/flash-sales"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Flash Sales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/bundles"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Bundles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/subscriptions"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Subscriptions
                  </Link>
                </li>
                {categories?.map((category) => (
                  <li key={category.handle}>
                    <Link
                      to="/$countryCode/categories/$handle"
                      params={{ countryCode, handle: category.handle }}
                      className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Business */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/services"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    All Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/providers"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Service Providers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/business"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    B2B Portal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/referrals"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Referral Program
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Account
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/account/login"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/account"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/account/wishlists"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Wishlists
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/account/subscriptions"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/account/loyalty"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/help"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${countryCode}/track` as any}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/returns"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/delivery-slots"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Delivery Slots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/verify"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Verification
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/about"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${countryCode}/blog` as any}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/events"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/venues"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Venues
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/announcements"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/contact"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-city-steel/30 py-8">
          <Newsletter variant="inline" />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-city-steel/30 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-city-muted">
              {new Date().getFullYear()} Dakkah CityOS. All rights reserved.
            </span>
            <div className="flex gap-6">
              <Link
                to="/$countryCode/privacy"
                params={{ countryCode }}
                className="text-xs text-city-muted hover:text-city-cyan transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/$countryCode/terms"
                params={{ countryCode }}
                className="text-xs text-city-muted hover:text-city-cyan transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
