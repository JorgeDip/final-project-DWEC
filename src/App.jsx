import { useState, useEffect } from 'react';
import { getCharacters } from './services/api.js';

import HomePage from './components/pages/HomePage.jsx';
import CharacterPage from './components/pages/CharacterPage.jsx';
// TODO:
// 1. Diseño de la página
// 2. Readme
// 3. Añadir buscador de personajes / localizaciones / episodios

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);


  useEffect(() => {
    // Load characters from the local JSON file on initial load
    getCharacters()
      .then(data => {
        setCharacters(data);
      })
      .catch(error => setError(error));
  }, []);



  // Render the selected character details if a character is selected
  if (selectedCharacter) {
    return <CharacterPage character={selectedCharacter} setSelectedCharacter={setSelectedCharacter} setError={setError} error={error} />
  }

  // Render the list of characters and pagination buttons
  return <HomePage characters={characters} setCharacters={setCharacters} setError={setError} error={error} setSelectedCharacter={setSelectedCharacter} />
}

export default App
