# MovieDB — TMDB Movie Explorer

SPA em React para explorar filmes populares do [TMDB](https://www.themoviedb.org/), buscar títulos, ver detalhes e gerenciar favoritos com persistência local.

## Funcionalidades

| Rota | Descrição |
|------|-----------|
| `/` | Filmes populares com infinite scroll e favoritar |
| `/movie/:id` | Detalhes (backdrop, gêneros, nota, sinopse, favoritar) |
| `/search?q=` | Busca TMDB com highlight do termo e infinite scroll |
| `/favorites` | Favoritos locais com ordenação e filtro via barra de busca |

A barra de busca do header:

- com **≥ 3 caracteres** (debounce) navega para `/search?q=…`
- em **Favoritos**, filtra a lista local (`/favorites?q=…`)
- ao limpar / ficar abaixo de 3 caracteres, volta ao estado anterior (Home ou lista completa)

## Stack

- React 19 + TypeScript + Vite
- React Router
- TanStack Query
- Context API (favoritos)
- Axios
- Tailwind CSS v4
- Vitest + Testing Library + MSW

## Pré-requisitos

- **Node.js 22+** (veja `.nvmrc`)
- Conta no TMDB e uma **API Key (v3 auth)**

```bash
nvm use   # usa a versão do .nvmrc (22)
```

## Setup

```bash
cp .env.example .env
```

Edite `.env` e preencha a chave:

```env
VITE_TMDB_API_KEY=sua_chave_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Obtenha a key em: [TMDB → Settings → API](https://www.themoviedb.org/settings/api).

```bash
npm install
npm run dev
```

App em `http://localhost:5173`.

> **Importante:** nunca commite `.env`. O `.env.example` contém apenas placeholders.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Typecheck + build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest em watch |
| `npm run test:run` | Vitest one-shot (CI) |

## CI

O workflow GitHub Actions (`.github/workflows/ci.yml`) roda em push/`pull_request` para `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run test:run`
4. `npm run build`

Usa Node da versão definida em `.nvmrc` (22).

## Arquitetura

Organização **por feature**, com camadas pragmáticas (Clean Architecture sem over-engineering):

```
src/
├── app/                 # composition root (providers, router, layout, styles)
├── shared/              # api, config, lib, ui genérico (sem dependência de features)
├── features/
│   ├── movies/          # popular, detalhes, MovieCard, repositório TMDB
│   ├── search/          # política de busca, SearchBar, página
│   └── favorites/       # context, localStorage, sort/filter, página
└── test/                # setup, MSW, fixtures, render helpers
```

Dentro de cada feature (quando aplicável):

```
domain/         # entidades, ports, regras puras (sem React/HTTP)
application/    # hooks / use-cases
data/           # adapters (TMDB, localStorage) + mappers
presentation/   # páginas e UI da feature
```

### Fluxo de dados (movies)

```
UI (pages)
  → application hooks (TanStack Query)
    → MovieRepository (port)
      → TmdbMovieRepository (adapter + Axios)
        → DTOs → mappers → domínio
```

Favoritos seguem o mesmo padrão via `FavoritesRepository` + Context.

## Decisões de design

- **TanStack Query** para servidor state (cache, retry, infinite scroll); **Context** só para favoritos (cliente + persistência).
- **Ports/adapters** (`MovieRepository`, `FavoritesRepository`) para isolar UI da TMDB/localStorage e facilitar testes.
- **URL como estado da busca** (`?q=`): deep-link, voltar/avançar e sync com a barra do header.
- **Debounce + mínimo de 3 caracteres** para reduzir chamadas à API e ruído na UX.
- **MovieCard recebe `isFavorite` / `onFavoriteAction` via props** — presentation não acopla o card ao Context (DIP na UI).
- **Mensagens de erro em português**, mapeadas a partir do status HTTP (`ApiError`).

## Testes

Cobertura pragmática (o que mais agrega no desafio):

- Unit: mappers TMDB, sort/filter de favoritos, repositório localStorage
- Página: busca + highlight, favoritar/persistir, empty state, erro de API + retry, query curta sem request

Stack: Vitest + RTL + MSW (`onUnhandledRequest: 'error'`).

```bash
nvm use
npm run test:run
```

## Trade-off: API key no frontend

Em SPAs Vite, variáveis `VITE_*` vão para o bundle. A key TMDB v3 fica **visível no browser** (e nas query strings do Axios).

Para este desafio isso é aceitável (comum em demos TMDB). Em produção, o ideal seria um **BFF/proxy** que guarda a key no servidor e rate-limita o cliente.

Use uma key com permissões mínimas e, se ela vazar no Git, **rotacione** em [TMDB API Settings](https://www.themoviedb.org/settings/api).

## Licença / créditos

Dados e imagens de filmes fornecidos por [TMDB](https://www.themoviedb.org/). Este projeto não é afiliado ao TMDB.
