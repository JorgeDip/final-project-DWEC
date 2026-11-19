import Button from "../atoms/Button";
import CharacterCard from "../molecules/CharacterCard";
import "./CharactersGridSection.css";

function CharactersGridSection({ error, page, handleChangePage, characters, setSelectedCharacter }) {
    return (
        <div className="container characters-grid-section">
            {error && <p>{error.message}</p>}

            <div className="characters-grid-section__grid">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} setSelectedCharacter={setSelectedCharacter} />
                ))}
            </div>

            <div className="characters-grid-section__pagination">
                <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>
                    Previous
                </Button>
                <span className="characters-grid-section__pagination-page">Page {page}</span>
                <Button onClick={() => handleChangePage(page + 1)} disabled={characters.length === 0}>
                    Next
                </Button>
            </div>
        </div >
    );
}

export default CharactersGridSection;