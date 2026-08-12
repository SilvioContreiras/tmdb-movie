import { Link } from 'react-router-dom'
import { paths } from '@/app/router/paths'
import { BrandLogoIcon } from '@/shared/ui'

export function FavoritesEmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <BrandLogoIcon className="size-20" />
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-app-text">
        Nenhum filme favorito ainda
      </h2>
      <p className="mt-2 max-w-md text-sm text-app-muted">
        Comece explorando filmes populares e adicione seus favoritos!
      </p>
      <Link
        to={paths.home}
        className="mt-6 rounded-lg bg-nav-active px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-nav-active/90"
      >
        Explorar Filmes
      </Link>
    </div>
  )
}
