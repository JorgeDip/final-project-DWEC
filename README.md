# Rick and Morty Data Explorer

React application that consumes the Rick and Morty API and shows its characters in two views: a general view (grid of characters) and a detail view (full information of one character).

<!-- README inicial, por poner más cosas. Borrar comentarios a medida de terminar de poner esas cosas. Papaya -->

## Group members

- Jorge Rodriguez
- José Montoro
- Víctor Chen

## Chosen API

**Rick and Morty API** – documentation: <https://rickandmortyapi.com/documentation>

## File structure

<!-- Borrador inicial, placeholder, cosa, papayaaaa -->
```
my-project/
├── public/
├── src/
│   ├── services/       # functions that call the API (fetch)
│   ├── components/
│   │   ├── atoms/      # smallest elements
│   │   ├── molecules/  # groups of atoms
│   │   ├── organisms/  # complex sections
│   │   ├── templates/  # page layouts without real data
│   │   └── pages/      # templates filled with real data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css       # design tokens (CSS variables)
├── package.json
└── README.md
```

<!-- PENDIENTE: cambiar la estructura para cuando ya esté completa.-->

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

```js
const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) throw new Error("Error fetching character");
  return response.json();
}
```

## Components

Waiting for the structure to be finished.

## Navigation

Not finished yet

## Hooks

Not finished yet

## How to run the project

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

