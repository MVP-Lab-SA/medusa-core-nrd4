import { CartDropdown } from "@/components/cart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCategories } from "@/lib/hooks/use-categories"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "@tanstack/react-router"

export const Navbar = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname) || "us"

  const { data: topLevelCategories } = useCategories({
    fields: "id,name,handle,parent_category_id",
    queryParams: { parent_category_id: "null" },
  })

  const categoryLinks = topLevelCategories?.map((cat) => ({
    id: cat.id,
    name: cat.name,
    handle: cat.handle,
  })) ?? []

  return (
    <div className="sticky top-0 inset-x-0 z-40">
      <header className="relative h-16 mx-auto border-b bg-city-dark/95 backdrop-blur-md border-city-steel/30">
        <nav className="content-container text-sm font-medium text-city-gray flex items-center justify-between w-full h-full">
          {/* Logo - Left */}
          <div className="flex items-center h-full">
            <Link
              to="/$countryCode"
              params={{ countryCode }}
              className="text-xl font-bold tracking-tight text-city-white hover:text-city-cyan transition-colors"
            >
              DAKKAH<span className="text-city-cyan">.</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <NavigationMenu.Root className="hidden lg:flex items-center h-full absolute left-1/2 -translate-x-1/2">
            <NavigationMenu.List className="flex items-center gap-x-8 h-full">
              {/* Products dropdown */}
              <NavigationMenu.Item className="h-full flex items-center">
                <NavigationMenu.Trigger className="text-city-gray hover:text-city-cyan h-full flex items-center gap-1 select-none transition-colors font-medium">
                  Products
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="content-container py-12">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                        Categories
                      </h3>
                      <div className="flex flex-col gap-3">
                        <NavigationMenu.Link asChild>
                          <Link
                            to="/$countryCode/store"
                            params={{ countryCode }}
                            className="text-city-gray hover:text-city-cyan text-base font-medium transition-colors"
                          >
                            All Products
                          </Link>
                        </NavigationMenu.Link>
                        {categoryLinks.map((link) => (
                          <NavigationMenu.Link key={link.id} asChild>
                            <Link
                              to="/$countryCode/categories/$handle"
                              params={{ countryCode, handle: link.handle }}
                              className="text-city-gray hover:text-city-cyan text-base font-medium transition-colors"
                            >
                              {link.name}
                            </Link>
                          </NavigationMenu.Link>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-city-cyan text-sm font-semibold uppercase tracking-widest">
                        Featured
                      </h3>
                      <p className="text-city-muted text-sm">
                        Discover our latest smart city infrastructure solutions designed for Vision 2030.
                      </p>
                    </div>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="h-full flex items-center">
                <Link
                  to="/$countryCode/store"
                  params={{ countryCode }}
                  className="text-city-gray hover:text-city-cyan transition-colors font-medium"
                >
                  Solutions
                </Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="h-full flex items-center">
                <span className="text-city-gray hover:text-city-cyan transition-colors font-medium cursor-pointer">
                  Enterprise
                </span>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            <NavigationMenu.Viewport
              className="absolute top-full bg-city-navy border-b border-city-steel/30 shadow-xl shadow-black/20 overflow-hidden
                data-[state=open]:animate-[dropdown-open_300ms_ease-out]
                data-[state=closed]:animate-[dropdown-close_300ms_ease-out]"
              style={{ left: "50%", transform: "translateX(-50%)", width: "100vw" }}
            />
          </NavigationMenu.Root>

          {/* Mobile Menu */}
          <Drawer>
            <DrawerTrigger className="lg:hidden text-city-gray hover:text-city-cyan">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </DrawerTrigger>
            <DrawerContent side="left" className="bg-city-navy border-city-steel/30">
              <DrawerHeader className="border-city-steel/30">
                <DrawerTitle className="text-city-white uppercase tracking-wide">Menu</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col py-4">
                <div className="px-6 py-4 text-city-cyan text-sm font-semibold uppercase tracking-widest">
                  Products
                </div>
                <div className="flex flex-col">
                  <DrawerClose asChild>
                    <Link
                      to="/$countryCode/store"
                      params={{ countryCode }}
                      className="px-10 py-3 text-city-gray hover:bg-city-slate/50 hover:text-city-cyan transition-colors"
                    >
                      All Products
                    </Link>
                  </DrawerClose>
                  {categoryLinks.map((link) => (
                    <DrawerClose key={link.id} asChild>
                      <Link
                        to="/$countryCode/categories/$handle"
                        params={{ countryCode, handle: link.handle }}
                        className="px-10 py-3 text-city-gray hover:bg-city-slate/50 hover:text-city-cyan transition-colors"
                      >
                        {link.name}
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
                <div className="px-6 py-4 text-city-cyan text-sm font-semibold uppercase tracking-widest mt-4">
                  Company
                </div>
                <div className="flex flex-col">
                  <DrawerClose asChild>
                    <Link
                      to="/$countryCode/store"
                      params={{ countryCode }}
                      className="px-10 py-3 text-city-gray hover:bg-city-slate/50 hover:text-city-cyan transition-colors"
                    >
                      Solutions
                    </Link>
                  </DrawerClose>
                  <span className="px-10 py-3 text-city-gray hover:bg-city-slate/50 hover:text-city-cyan transition-colors cursor-pointer">
                    Enterprise
                  </span>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Cart - Right */}
          <div className="flex items-center gap-x-6 h-full justify-end">
            <CartDropdown />
          </div>
        </nav>
      </header>
    </div>
  )
}
