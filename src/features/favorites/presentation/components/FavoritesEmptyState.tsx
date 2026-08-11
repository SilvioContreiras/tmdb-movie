import { Link } from 'react-router-dom'
import { paths } from '@/app/router/paths'

function EmptyFavoritesIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      className="mx-auto h-40 w-auto text-zinc-300"
      role="img"
      aria-label="Nenhum favorito salvo"
    >
      <rect
        x="40"
        y="28"
        width="160"
        height="124"
        rx="12"
        fill="currentColor"
        opacity="0.25"
      />
      <rect
        x="58"
        y="46"
        width="70"
        height="88"
        rx="8"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M155 78c0-10.5 8.3-19 18.5-19 7.6 0 14.1 4.5 17 11.2 2.9-6.7 9.4-11.2 17-11.2 10.2 0 18.5 8.5 18.5 19 0 28.5-35.5 47-35.5 47S155 106.5 155 78Z"
        fill="currentColor"
        opacity="0.7"
        transform="translate(-55 8) scale(0.85)"
      />
    </svg>
  )
}

export function FavoritesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <EmptyFavoritesIllustration />
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-zinc-900">
        Nenhum favorito ainda
      </h2>
      <p className="mt-2 max-w-md text-sm text-zinc-600">
        Explore os filmes populares e toque no coração para salvar os que você
        mais gosta.
      </p>
      <Link
        to={paths.home}
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Explorar filmes
      </Link>
    </div>
  )
}
