# GenDex

GenDex is a modern Pokédex web app built with Vue 3, Nuxt 3, and PokéAPI.  
It allows users to explore Pokémon by game generation: simply select a generation to browse, search, and view detailed information about Pokémon from that era.

## Features

- 🌱 **Generation-based navigation:** Select a generation to see only Pokémon from that era.
- 🔍 **Search:** Quickly find Pokémon by name or number within the selected generation.
- 📄 **Detailed view:** See images, types, and pokédex entry for each Pokémon.
- ⚡ **Responsive design:** Works great on desktop and mobile.
- ⚙️ **Fast & modern:** Built with Nuxt 3, Vue 3, and uses PokéAPI for real-time data.

## Demo

> https://gendex.onrender.com

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Setup

Install dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### Development

Start the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Production

Build for production:

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build

# bun
bun run build
```

Preview the production build locally:

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview

# bun
bun run preview
```

## Project Structure

- `pages/` — Nuxt pages (including generation selection and Pokémon details)
- `components/` — UI components (lists, details, headers, etc.)
- `composables/` — Reusable logic (API fetch, favorites, etc.)
- `utils/` — Utility functions (formatting, helpers)
- `assets/` — Static assets (images, styles)

## Data Source

All Pokémon data is fetched live from [PokéAPI](https://pokeapi.co/).

## License

[MIT](LICENSE)

---

> Made with ❤️ using Nuxt 3 and PokéAPI, for learning purposes.