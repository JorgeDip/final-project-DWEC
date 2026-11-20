# Rick and Morty Data Explorer

This is a React application that consumes the Rick and Morty API and shows its characters in two views: a general view (grid of characters) and a detail view (full information of one character).

<!-- README inicial, por poner más cosas. Borrar comentarios a medida de terminar de poner esas cosas. Papaya -->

## Group members

- Jorge Rodriguez
- José Montoro
- Víctor Chen

## Chosen API

**Rick and Morty API** – documentation: <https://rickandmortyapi.com/documentation>

## File structure

```
final-project-DWEC/
├── public/
├── src/
│   ├── data/
│   │   ├── characters.json
│   │   └── characters_enriched.json
│   ├── services/
│   │   └── api.js              # all API calls (fetch) + localStorage cache
│   ├── components/
│   │   ├── atoms/              # smallest elements
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── icons/              # SVG icons
│   │   │   ├── FolderIcon.jsx
│   │   │   ├── PlanetIcon.jsx
│   │   │   ├── SearchIcon.jsx
│   │   │   └── UsersGroupIcon.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── molecules/          # groups of atoms
│   │   │   ├── CharacterCard.jsx
│   │   │   └── CharacterCard.css
│   │   ├── organisms/          # complex sections
│   │   │   ├── CharactersGridSection.jsx / .css
│   │   │   ├── HomeInfoSection.jsx / .css
│   │   │   └── SearchBarSection.jsx / .css
│   │   ├── templates/          # page layouts without real data
│   │   │   └── PageTemplate.jsx
│   │   └── pages/              # templates filled with real data
│   │       ├── HomePage.jsx / .css
│   │       └── CharacterPage.jsx / .css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # design tokens (CSS variables)
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
```

## Example of API access

Request:

```
GET https://rickandmortyapi.com/api/character/1
```

Response (extract):

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "gender": "Male",
  "origin": { "name": "Earth (C-137)", "url": "..." },
  "location": { "name": "Citadel of Ricks", "url": "..." },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": ["https://rickandmortyapi.com/api/episode/1", "..."]
}
```

Service function that uses it (`src/services/api.js`, simplified):

```js
export async function getCharacters(page = 1) {
  // Validate the page number
  if (page < 1) throw new Error("Page number must be greater than or equal to 1");
  if (page > 42) throw new Error("Page number must be less than or equal to 42");

  // ... returns the cached page from localStorage if it exists ...

  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);
  const data = await response.json();

  // Keep only the fields the app needs
  const cleanResults = data.results.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    origin: character.origin?.name,
    location: character.location?.name,
  }));

  // ... saves cleanResults in localStorage ...
  return cleanResults;
}
```

All `fetch` calls live in this single file. The functions clean the response and only keep the fields the app needs.

| Function | Returns | Notes |
|---|---|---|
| `getCharacters(page = 1)` | Array of `{ id, name, status, species, origin, location }` for that page | The page must be between 1 and 42. Cached per page in `localStorage` (`characters_cache_pages_v2`) |
| `getCharacterById(id)` | `{ id, name, status, species, type, gender, origin, location, episode, description, current_residence, mental_state, citadel_status, age, threat_level, related_character_ids }` | The extra fields come from the local file `src/data/characters_enriched.json`. Cached in `localStorage` (`characters_cache`). `type` falls back to `"Estándar"` when empty |
| `getCharactersFromFile()` | All the characters of the enriched local file | Cached in `localStorage` (`characters_cache_file`). Not used at the moment |

The functions throw an `Error` if the request fails, so the components can show the message.

## Components

| Component | Level | Description |
|---|---|---|
| `Button` | Atom | Reusable button. Used in the character cards, the pagination and the "Back" action |
| `UsersGroupIcon`, `PlanetIcon`, `FolderIcon`, `SearchIcon` | Atom | SVG icons used in the header counters and in the search bar (folder `icons/`) |
| `CharacterCard` | Molecule | Card of one character: image, id, status, name, species, origin, location and a "View details" button |
| `HomeInfoSection` | Organism | Header of the home page with the database information and the counters |
| `SearchBarSection` | Organism | Search bar of the home page (visual only for now) |
| `CharactersGridSection` | Organism | Grid of `CharacterCard`s with the pagination controls |
| `Footer` | Organism | Footer of the page (folder `layout/`) |
| `PageTemplate` | Template | Page layout with `header`, `main` content and `footer` slots |
| `HomePage` | Page | General view: header, search bar, grid of characters and footer. Receives the characters, the error, the page number and the handlers from `App` |
| `CharacterPage` | Page | Detail view: name, image, status, species and gender of one character, plus a "Back" button. Receives `character`, `setSelectedCharacter`, `setError` and `error` as props |

## Navigation

The app does not use React Router. `App.jsx` keeps a `selectedCharacter` state (`null` by default):

- If it is `null`, `App` renders `HomePage` (general view).
- If it contains a character, `App` renders `CharacterPage` (detail view).

The "View details" button of each `CharacterCard` calls `setSelectedCharacter(character)`. This function is passed down as a prop through `HomePage` → `CharactersGridSection` → `CharacterCard`. The "Back" button of `CharacterPage` calls `setSelectedCharacter(null)`. The current page number (`page`) also lives in `App`, so the user comes back to the same page of the list.

## Hooks

Only the built-in `useState` and `useEffect` are used (no custom hooks).

- `useState` in `App.jsx`: `characters` (the characters of the current page), `selectedCharacter` (which view is shown), `page` (pagination) and `error` (error message).
- `useEffect` in `App.jsx`: loads the list with `getCharacters(page)` every time `page` changes (dependency array `[page]`).
- `useEffect` in `CharacterPage.jsx`: loads the character details with `getCharacterById` every time the selected id changes.

## How to run the project

```bash
git clone https://github.com/JorgeDip/final-project-DWEC.git
cd final-project-DWEC
pnpm install
pnpm dev
```

With npm it also works: `npm install` and `npm run dev`.

