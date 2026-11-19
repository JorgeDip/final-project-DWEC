
import { getCharacters, getCharactersFromFile } from './services/api.js';
import { useState, useEffect } from 'react';
import HomePage from './components/pages/HomePage.jsx';
import CharacterPage from './components/pages/CharacterPage.jsx';

// TODO:
// 1. Diseño de la página
// 2. Readme
// 3. Añadir buscador de personajes / localizaciones / episodios

function App() {
  const [actualPage, setActualPage] = useState("characters"); // characters, episodes, locations
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   // Load characters from the local JSON file on initial load
  //   getCharactersFromFile()
  //     .then(data => {
  //       setCharacters(data);
  //     })
  //     .catch(error => setError(error));
  // }, []);

  useEffect(() => {
    getCharacters(page)
      .then(data => {
        setCharacters(data);
      })
      .catch(error => setError(error));
  }, [page]);

  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > 42) {
      setError(new Error("Page number must be between 1 and 42"));
      return;
    }
    setPage(newPage);
  }

  // Render the selected character details if a character is selected
  if (selectedCharacter) {
    return <CharacterPage character={selectedCharacter} setSelectedCharacter={setSelectedCharacter} setError={setError} error={error} />
  }

  // Render the list of characters and pagination buttons
  return <HomePage characters={characters} error={error} page={page} handleChangePage={handleChangePage} setSelectedCharacter={setSelectedCharacter} />
}

export default App
