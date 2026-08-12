import { useDebouncedSearchParam } from '@/features/search/application'

export function SearchBar() {
  const {
    value,
    setValue,
    isOnFavoritesPage,
    onFocus,
    onBlur,
    submit,
  } = useDebouncedSearchParam()

  return (
    <form
      onSubmit={submit}
      className="min-w-0 flex-1"
      role="search"
      aria-label={
        isOnFavoritesPage ? 'Filtrar filmes favoritos' : 'Buscar filmes'
      }
    >
      <label htmlFor="search" className="sr-only">
        {isOnFavoritesPage ? 'Filtrar favoritos' : 'Buscar filmes'}
      </label>
      <input
        id="search"
        name="q"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={
          isOnFavoritesPage ? 'Filtrar favoritos...' : 'Buscar filmes...'
        }
        className="w-full rounded-full border border-app-border bg-app-surface px-4 py-2.5 text-sm text-app-text outline-none placeholder:text-app-muted focus:border-nav-active focus:ring-2 focus:ring-nav-active/30"
      />
    </form>
  )
}
