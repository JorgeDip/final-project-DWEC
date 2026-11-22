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
const API_TOTAL_PAGES = Math.ceil(API_TOTAL_CHARACTERS / PAGE_SIZE); // 42

function HomePage({ characters, setCharacters, setError, error, setSelectedCharacter }) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [fileCharacters, setFileCharacters] = useState([]);
    const isSearching = searchTerm !== '';

    useEffect(() => {
        getCharacters(page)
            .then(data => setCharacters(data))
            .catch(error => setError(error));
    }, [page]);


    // Load characters from the local JSON file when a search term is entered
    useEffect(() => {
        if (isSearching && fileCharacters.length === 0) {
            const normalizeCharacter = (c) => ({
                ...c,
                origin: c.origin?.name ?? c.origin,
                location: c.location?.name ?? c.location,
            });

            getCharactersFromFile()
                .then(data => setFileCharacters(data.map(normalizeCharacter)))
                .catch(error => setError(error));
        }

    }, [searchTerm]);

    // Filter the characters based on the search term and paginate the results
    const filtered = fileCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the total number of pages for the search results using Math.max to ensure at least one page is available
    const totalSearchPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

    const searchResults = filtered.slice(
        (searchPage - 1) * PAGE_SIZE,
        searchPage * PAGE_SIZE
    );

    // combine the 2 functions into one, passing the total pages as a parameter
    const handleChangePage = (newPage) => {
        const maxPage = isSearching ? totalSearchPages : API_TOTAL_PAGES;

        if (newPage < 1 || newPage > maxPage) {
            setError(new Error(`Page number must be between 1 and ${maxPage}`));
            return;
        }

        if (isSearching) {
            setSearchPage(newPage);
        } else {
            setPage(newPage);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setSearchPage(1); // every time the search term changes, reset the search page to 1
    };

    return (
        <div className="home-page">
            <PageTemplate header={<HomeInfoSection />} footer={<Footer />}>

                <SearchBarSection handleInputChange={handleInputChange} />

                {/* Show the search results or the default characters */}
                <CharactersGridSection
                    error={error}
                    page={isSearching ? searchPage : page}
                    handleChangePage={handleChangePage}
                    characters={isSearching ? searchResults : characters}
                    setSelectedCharacter={setSelectedCharacter}
                    pageSize={PAGE_SIZE}
                    totalCharacters={isSearching ? filtered.length : API_TOTAL_CHARACTERS}
                />


            </PageTemplate>
        </div>
    );
}

export default HomePage;