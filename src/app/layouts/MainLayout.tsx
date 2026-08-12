import { NavLink, Outlet } from 'react-router-dom'
import { paths } from '@/app/router/paths'
import { BrandLogoIcon } from '@/shared/ui'
import { SearchBar } from '@/features/search/presentation'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-nav-active text-white'
      : 'text-app-muted hover:bg-app-surface-elevated hover:text-app-text',
  ].join(' ')

export function MainLayout() {
  return (
    <div className="min-h-dvh bg-app-bg">
      <header className="sticky top-0 z-50 border-b border-app-border/80 bg-app-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <NavLink
              to={paths.home}
              className="flex shrink-0 items-center gap-2"
            >
              <BrandLogoIcon />
              <span className="text-lg font-bold tracking-tight text-brand">
                MovieDB
              </span>
            </NavLink>

            <nav
              className="flex items-center gap-1 sm:hidden"
              aria-label="Principal"
            >
              <NavLink to={paths.favorites} className={navLinkClass}>
                Favoritos
              </NavLink>
            </nav>
          </div>

          <div className="flex min-w-0 flex-1 justify-center sm:px-4">
            <SearchBar />
          </div>

          <nav
            className="hidden shrink-0 items-center gap-1 sm:flex"
            aria-label="Principal"
          >
            <NavLink to={paths.home} className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to={paths.favorites} className={navLinkClass}>
              Favoritos
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
