
import { getCharacters, getCharacterById } from './services/api.js';
import { useState, useEffect } from 'react';

// TODO:
// 1. Diseño de la página
// 2. Readme
// 3. Añadir buscador de personajes

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCharacters(page)
      .then(data => {
        setCharacters(data);
      })
      .catch(error => setError(error));
  }, [page]);

  // Fetch the selected character details when a character is selected
  const selectedId = selectedCharacter?.id;
  useEffect(() => {
    if (!selectedId) return;

    getCharacterById(selectedId)
      .then(data => setSelectedCharacter(data))
      .catch(error => setError(error));
  }, [selectedId]);


  // Render the selected character details if a character is selected
  if (selectedCharacter) {
    return <>
      <h1>{selectedCharacter.name}</h1>
      <img src={selectedCharacter.image} alt={selectedCharacter.name} />
      <p>Status: {selectedCharacter.status}</p>
      <p>Species: {selectedCharacter.species}</p>
      <p>Gender: {selectedCharacter.gender}</p>
      <button onClick={() => setSelectedCharacter(null)}>Back</button>
      {error && <p>{error.message}</p>}
    </>
  }

  // Render the list of characters and pagination buttons
  return <>
    {error && <p>{error.message}</p>}
    <h1>Rick and Morty</h1> <button onClick={() => localStorage.clear()}>Clear Cache</button>
    {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
    {page < 42 && <button onClick={() => setPage(page + 1)}>Next</button>}
    <ul>
      {characters.map(character => (
        <li key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <button onClick={() => setSelectedCharacter(character)}>View Details</button>
        </li>
      ))}
    </ul>
  </>
}

export default App
