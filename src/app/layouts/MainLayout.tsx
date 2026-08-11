import { NavLink, Outlet } from 'react-router-dom'
import { paths } from '@/app/router/paths'

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
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink
            to={paths.home}
            className="text-sm font-semibold tracking-tight text-zinc-900"
          >
            TMDB Movies
          </NavLink>

          <nav className="flex items-center gap-1" aria-label="Principal">
            <NavLink to={paths.home} className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to={paths.search} className={navLinkClass}>
              Busca
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
