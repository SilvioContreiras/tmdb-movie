# MovieDB — TMDB Movie Explorer

SPA em React para explorar filmes do [TMDB](https://www.themoviedb.org/): populares, busca, detalhes e favoritos com persistência local.

## Stack

React 19 · TypeScript · Vite · React Router · TanStack Query · Context API · Axios · Tailwind CSS v4 · Vitest · Testing Library · MSW

## Setup

Requisitos: **Node.js 22+** (`.nvmrc`) e uma [API Key TMDB v3](https://www.themoviedb.org/settings/api).

```bash
nvm use
cp .env.example .env   # preencha VITE_TMDB_API_KEY
npm install
npm run dev            # http://localhost:5173
```

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Typecheck + build |
| `npm run lint` | ESLint |
| `npm run test` / `test:run` | Vitest (watch / CI) |

CI (GitHub Actions): `lint` → `test:run` → `build` com Node 22.

## Deploy (Vercel)

1. Importe o repo em [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite** (ou deixe o `vercel.json`)
3. Em **Environment Variables**, adicione:
   - `VITE_TMDB_API_KEY`
   - `VITE_TMDB_BASE_URL` = `https://api.themoviedb.org/3`
   - `VITE_TMDB_IMAGE_BASE_URL` = `https://image.tmdb.org/t/p`
4. Deploy

O `vercel.json` já define build (`dist`) e rewrite SPA para o React Router.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Populares + infinite scroll |
| `/movie/:id` | Detalhes + favoritar |
| `/search?q=` | Busca TMDB (≥ 3 chars, debounce, highlight) |
| `/favorites` | Favoritos locais (ordenar + filtrar via header) |

## Arquitetura

Feature-based + camadas pragmáticas:

```
src/
├── app/        # providers, router, layout
├── shared/     # api, config, lib, ui genérico
├── features/   # movies · search · favorites
└── test/       # MSW, fixtures, helpers
```

Por feature: `domain` → `application` → `data` / `presentation`.

UI → hooks (Query) → port (`MovieRepository`) → adapter TMDB. Favoritos: Context + `FavoritesRepository` (localStorage).

## Decisões

- **Query** para server state; **Context** só para favoritos
- **Ports/adapters** para isolar API/storage e facilitar testes
- **URL (`?q=`)** como estado da busca (deep-link + sync do header)
- **Code splitting por rota** (`React.lazy` + `Suspense`)
- Key `VITE_*` fica no browser (aceitável no desafio; em produção usaria BFF/proxy)

## Créditos

Dados e imagens: [TMDB](https://www.themoviedb.org/). Projeto não afiliado.
