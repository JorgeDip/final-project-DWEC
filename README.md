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
│   ├── services/
│   │   └── api.js              # all API calls (fetch) + localStorage cache
│   ├── components/
│   │   ├── atoms/              # smallest elements
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── molecules/          # groups of atoms
│   │   ├── organisms/          # complex sections
│   │   ├── templates/          # page layouts without real data
│   │   └── pages/              # templates filled with real data
│   │       ├── HomePage.jsx
│   │       └── CharacterPage.jsx
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

Service function that uses it (`src/services/api.js`):

All `fetch` calls live in this single file. Both functions clean the response and only keep the fields the app needs.

| Function | Returns | Notes |
|---|---|---|
| `getCharacters(page = 1)` | Array of `{ id, name }` for that page | The page must be between 1 and 42. Cached per page in `localStorage` (`characters_cache_pages`) |
| `getCharacterById(id)` | `{ id, name, status, species, type, gender, origin, location }` | Cached in `localStorage` (`characters_cache`). `type` falls back to `"Estándar"` when empty |

Both functions throw an `Error` if the request fails, so the components can show the message.

Example of use (`CharacterPage.jsx`):

```jsx
useEffect(() => {
  if (!selectedId) return;

  getCharacterById(selectedId)
    .then(data => setSelectedCharacter(data))
    .catch(error => setError(error));
}, [selectedId]);
```
Character images are loaded from a public Supabase storage bucket, using the character id as the file name.

## Components

| Component | Level | Description |
|---|---|---|
| `Button` | Atom | Reusable button. Used, for example, for the "Back" action |
| `HomePage` | Page | General view: grid of characters <!-- VERIFY: completar con lo que hace HomePage.jsx --> |
| `CharacterPage` | Page | Detail view: name, image, status, species and gender of one character, plus a "Back" button. Receives `character`, `setSelectedCharacter`, `setError` and `error` as props |
<!-- PENDIENTE: añadir molecules, organisms y templates cuando existan. -->

## Navigation

The app does not use React Router. Navigation between the two views is handled with `useState`: when a character is selected, the detail view is shown; when `selectedCharacter` goes back to `null` (the "Back" button), the general view is shown again.
<!-- VERIFY: comprobar con App.jsx dónde vive el estado selectedCharacter y cómo decide qué página se muestra. -->

## Hooks

Only the built-in `useState` and `useEffect` are used (no custom hooks).

- `useState`: keeps the selected character and the error message. <!-- VERIFY: confirmar en App.jsx -->
- `useEffect`: in `CharacterPage`, it loads the character details through `getCharacterById` every time the selected id changes.

## How to run the project

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

