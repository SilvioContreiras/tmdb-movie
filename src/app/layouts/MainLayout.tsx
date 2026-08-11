import { NavLink, Outlet } from 'react-router-dom'
import { paths } from '@/app/router/paths'
import { GlobalSearchBar } from '@/shared/ui'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-zinc-900 text-white'
      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
  ].join(' ')

export function MainLayout() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <NavLink
              to={paths.home}
              className="shrink-0 text-sm font-semibold tracking-tight text-zinc-900"
            >
              TMDB Movies
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

          <GlobalSearchBar />

          <nav
            className="hidden items-center gap-1 sm:flex"
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
