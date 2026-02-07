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
          <div className="lg:w-1/3 flex flex-col gap-y-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Products */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Products
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
                    to="/$countryCode/blog"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/stores"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Find a Store
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
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/wishlist"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/loyalty"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/$countryCode/faq"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    FAQ
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
                    to="/$countryCode/gift-cards"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$countryCode/lookbook"
                    params={{ countryCode }}
                    className="text-city-gray hover:text-city-cyan transition-colors text-sm"
                  >
                    Lookbook
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Newsletter variant="inline" />
            </div>
          </div>
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
