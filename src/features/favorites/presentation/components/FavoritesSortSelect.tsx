import type { FavoritesSortOption } from '@/features/favorites/domain'

type FavoritesSortSelectProps = {
  value: FavoritesSortOption
  onChange: (value: FavoritesSortOption) => void
}

const OPTIONS: { value: FavoritesSortOption; label: string }[] = [
  { value: 'title-asc', label: 'Título (A-Z)' },
  { value: 'title-desc', label: 'Título (Z-A)' },
  { value: 'rating-desc', label: 'Nota (maior → menor)' },
]

export function FavoritesSortSelect({
  value,
  onChange,
}: FavoritesSortSelectProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
      <label
        htmlFor="favorites-sort"
        className="text-sm font-medium text-app-muted"
      >
        Ordenar por:
      </label>
      <select
        id="favorites-sort"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as FavoritesSortOption)
        }
        className="rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none focus:border-nav-active focus:ring-2 focus:ring-nav-active/30"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
