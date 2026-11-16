
import { getCharacters, getCharacterById } from './services/api.js';
import { useState, useEffect } from 'react';
import HomePage from './components/pages/HomePage.jsx';
import CharacterPage from './components/pages/CharacterPage.jsx';
// TODO:
// 1. Diseño de la página
// 2. Readme
// 3. Añadir buscador de personajes

function App() {
  const [actualPage, setActualPage] = useState("characters"); // characters, episodes, locations
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

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
    return <CharacterPage character={selectedCharacter} setSelectedCharacter={setSelectedCharacter} error={error} />
  }

  // Render the list of characters and pagination buttons
  return <HomePage characters={characters} error={error} page={page} setPage={setPage} setSelectedCharacter={setSelectedCharacter} />
}

export default App
