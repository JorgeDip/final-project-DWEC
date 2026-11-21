import PageTemplate from '../templates/PageTemplate.jsx';
import Footer from '../layout/Footer.jsx';
import HomeInfoSection from '../organisms/HomeInfoSection.jsx';
import SearchBarSection from '../organisms/SearchBarSection.jsx';
import CharactersGridSection from '../organisms/CharactersGridSection.jsx';

import { getCharacters, getCharactersFromFile } from '../../services/api.js';
import { useState, useEffect } from 'react';

import './HomePage.css';

const PAGE_SIZE = 20;
const API_TOTAL_CHARACTERS = 826;

function HomePage({ characters, setCharacters, setError, error, setSelectedCharacter }) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [fileCharacters, setFileCharacters] = useState([]);

    // Listado normal (API), paginado por page
    useEffect(() => {
        getCharacters(page)
            .then(data => setCharacters(data))
            .catch(error => setError(error));
    }, [page]);

    // Al empezar a buscar, se cargan los personajes del JSON (una sola vez)
    useEffect(() => {
        if (searchTerm !== '' && fileCharacters.length === 0) {
            const normalizeCharacter = (c) => ({
                ...c,
                origin: c.origin?.name ?? c.origin,
                location: c.location?.name ?? c.location,
            });

            // en HomePage.jsx
            getCharactersFromFile()
                .then(data => setFileCharacters(data.map(normalizeCharacter)))
                .catch(error => setError(error));
        }

    }, [searchTerm]);

    // Filtrado + paginación de la búsqueda (valores derivados, sin estado extra)
    const filtered = fileCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalSearchPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const searchResults = filtered.slice(
        (searchPage - 1) * PAGE_SIZE,
        searchPage * PAGE_SIZE
    );

    const handleChangePage = (newPage) => {
        if (newPage < 1 || newPage > 42) {
            setError(new Error("Page number must be between 1 and 42"));
            return;
        }
        setPage(newPage);
    };

    const handleChangeSearchPage = (newPage) => {
        if (newPage < 1 || newPage > totalSearchPages) {
            setError(new Error(`Page number must be between 1 and ${totalSearchPages}`));
            return;
        }
        setSearchPage(newPage);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setSearchPage(1); // cada búsqueda nueva empieza en la página 1
    };

    return (
        <div className="home-page">
            <PageTemplate header={<HomeInfoSection />} footer={<Footer />}>

                <SearchBarSection handleInputChange={handleInputChange} />

                {searchTerm ? (
                    <CharactersGridSection
                        error={error}
                        page={searchPage}
                        handleChangePage={handleChangeSearchPage}
                        characters={searchResults}
                        setSelectedCharacter={setSelectedCharacter}
                        pageSize={PAGE_SIZE}
                        totalCharacters={filtered.length}
                    />
                ) : (
                    <CharactersGridSection
                        error={error}
                        page={page}
                        handleChangePage={handleChangePage}
                        characters={characters}
                        setSelectedCharacter={setSelectedCharacter}
                        pageSize={PAGE_SIZE}
                        totalCharacters={API_TOTAL_CHARACTERS}
                    />
                )}

            </PageTemplate>
        </div>
    );
}

export default HomePage;