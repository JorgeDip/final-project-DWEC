# Rick and Morty Data Explorer

This is a React application that consumes the Rick and Morty API and shows its characters in two views: a general view (grid of characters) and a detail view (full information of one character).

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
│   │   ├── api.js              # all API calls (fetch) + localStorage cache
│   │   └── utils.js            # helper functions (pickRandom)
│   ├── components/
│   │   ├── atoms/              # smallest elements
│   │   │   ├── Badge.jsx
│   │   │   ├── Badge.css
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   ├── CharacterInfo.jsx
│   │   │   ├── CharacterInfo.css
│   │   │   ├── Spinner.jsx
│   │   │   └── Spinner.css
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
│   │   │   ├── CharacterCard.css
│   │   │   ├── CharacterEpisodesTable.jsx
│   │   │   ├── CharacterPageHeader.jsx
│   │   │   ├── CharacterPageHeader.css
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── LoadingScreen.css
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
├── eslint.config.js
├── package.json
├── package-lock.json
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
| `getCharacterById(id)` | `{ id, name, status, species, type, gender, origin, location, episode, description, current_residence, mental_state, citadel_status, age, threat_level, related_character_ids }` | The id is converted to a number. The extra fields come from the local file `src/data/characters_enriched.json`. Cached in `localStorage` (`characters_cache`). `type` falls back to `"Standard"` when empty |
| `getCharactersFromFile()` | All the characters of the enriched local file | Used by the search bar of the home page. Cached in `localStorage` (`characters_cache_file`) |
| `getEpisodeById(id)` | The episode object returned by the API (`id`, `name`, `air_date`, `episode`, ...) | `GET /episode/:id`. Cached in `localStorage` (`episodes_cache`). Used by the episodes table of the detail page |

Two small private helpers, `readCache` and `writeCache`, read and write these `localStorage` caches and ignore storage errors.

The functions throw an `Error` if the request fails, so the components can show the message.

## Components

| Component | Level | Description |
|---|---|---|
| `Button` | Atom | Reusable button with variants (`card` by default, `primary`, `secondary`, `neutral`, `back`), an optional small size (`size="sm"`) and a full-width option (`block`). Used in the character cards, the pagination and the detail page |
| `Badge` | Atom | Small label: the character id (`#001`) or its status (Alive / Dead / unknown) with the status color |
| `CharacterInfo` | Atom | Box with a label and a value (`—` when there is no value), with an optional `danger` style. Used in the detail view |
| `Spinner` | Atom | Animated loading symbol (two rotating rings) |
| `UsersGroupIcon`, `PlanetIcon`, `FolderIcon`, `SearchIcon` | Atom | SVG icons used in the header counters and in the search bar (folder `icons/`) |
| `CharacterCard` | Molecule | Card of one character: image, id, status, name, species, origin, location and a "View details" button |
| `CharacterPageHeader` | Molecule | Header of the detail page. It receives the character, a function to format the id and a function to go back to the general view |
| `CharacterEpisodesTable` | Molecule | Table with the episodes in which the character appears |
| `LoadingScreen` | Molecule | Full-screen loading screen: a `Spinner` with a random short phrase below it (series catchphrases and our own phrases). It is shown for 2-3 seconds every time the detail page opens |
| `HomeInfoSection` | Organism | Header of the home page with the database information and the counters |
| `SearchBarSection` | Organism | Search bar of the home page. It sends the typed text to `HomePage` through `handleInputChange` |
| `CharactersGridSection` | Organism | Grid of `CharacterCard`s with the pagination controls. It is used both for the normal list and for the search results |
| `Footer` | Organism | Footer of the page (folder `layout/`) |
| `PageTemplate` | Template | Page layout with `header`, `main` content and `footer` slots |
| `HomePage` | Page | General view: header, search bar, grid of characters and footer. It keeps the page number and the search term, loads the list with `getCharacters(page)` and, when the user searches, filters the characters of the local file by name (20 per page). Receives `characters`, `setCharacters`, `error`, `setError` and `setSelectedCharacter` from `App` |
| `CharacterPage` | Page | Detail view of one character: loading screen, description, status, species, gender, origin, current residence, mental state, Citadel status, threat level bar, a table with its episodes and three random related characters to jump to. Receives `characterId`, `setSelectedCharacter`, `setError` and `error` as props. If the character cannot be loaded, it shows the error message and a "Back" button |

## Navigation

The app does not use React Router. `App.jsx` keeps a `selectedCharacter` state with the **id** of the selected character (`null` by default):

- If it is `null`, `App` renders `HomePage` (general view).
- If it contains an id, `App` renders `CharacterPage` (detail view). The page receives the id as `characterId` and loads the character data by itself with `getCharacterById`.

The "View details" button of each `CharacterCard` calls `setSelectedCharacter` with the id of its character. This function is passed down as a prop through `HomePage` → `CharactersGridSection` → `CharacterCard`.

In the detail view, the back button of `CharacterPageHeader` and the "Quick teleport" cards call `handleChangeCharacter`. It clears the error and sets `selectedCharacter` to `null` (back to the general view) or to another id (jump to a related character).

`App` renders `CharacterPage` with `key={selectedCharacter}`, so the page starts from scratch (and shows the loading screen again) every time the selected id changes, including when the user jumps to a related character.

## Hooks

Only the built-in `useState` and `useEffect` are used (no custom hooks).

**`useState`**

- `App.jsx`: `characters` (the characters shown in the list), `error` (error message) and `selectedCharacter` (which view is shown).
- `HomePage.jsx`: `page` (pagination of the API list), `searchTerm`, `searchPage` (pagination of the search results) and `fileCharacters` (characters of the local file, used by the search).
- `CharacterPage.jsx`: `tab` (selected tab), `loading`, `character`, `episodes` and `related` (related characters).
- `LoadingScreen.jsx`: the random phrase shown under the spinner (picked once, when the screen appears).

**`useEffect`**

- `App.jsx`: loads the first page of characters when the app starts.
- `HomePage.jsx`: one effect loads the list with `getCharacters(page)` every time `page` changes, and another one loads the local file with `getCharactersFromFile()` the first time the user types in the search bar (dependency `[searchTerm]`).
- `CharacterPage.jsx`: one effect loads the details with `getCharacterById` every time `characterId` changes and keeps the loading screen visible for 2-3 seconds, even if the data arrives earlier. Another one loads the episodes (`getEpisodeById`) and three random related characters when the character data is available.

Example (`CharacterPage.jsx`):

```jsx
useEffect(() => {
  let ignore = false;

  // the loading screen stays visible for 2-3 seconds, even if the data arrives earlier
  const minTime = new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

  const request = getCharacterById(characterId)
    .then((data) => {
      if (!ignore) setCharacter(data);
    })
    .catch((err) => {
      if (!ignore) setError(err);
    });

  Promise.all([request, minTime]).then(() => {
    if (!ignore) setLoading(false);
  });

  // cleanup: if the id changes or the page closes, the old request is ignored
  return () => {
    ignore = true;
  };
}, [characterId]);
```

## How to run the project

```bash
git clone https://github.com/JorgeDip/final-project-DWEC.git
cd final-project-DWEC
pnpm install
pnpm dev
```

With npm it also works: `npm install` and `npm run dev`.