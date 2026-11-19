import Button from "../atoms/Button";
import CharacterCard from "../molecules/CharacterCard";
import "./CharactersGridSection.css";

const PAGE_SIZE = 20;
const TOTAL_CHARACTERS = 826;
const TOTAL_PAGES = 42;

function CharactersGridSection({ error, page, handleChangePage, characters, setSelectedCharacter }) {
    const firstItem = (page - 1) * PAGE_SIZE + 1;
    const lastItem = (page - 1) * PAGE_SIZE + characters.length;

    return (
        <div className="container characters-grid-section">
            {error && <p>{error.message}</p>}

            <div className="characters-grid-section__grid">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} setSelectedCharacter={setSelectedCharacter} />
                ))}
            </div>

            <div className="characters-grid-section__pagination">
                {characters.length > 0 && (
                    <p className="characters-grid-section__summary">
                        Showing <span>{firstItem} - {lastItem}</span> of <span>{TOTAL_CHARACTERS}</span> characters
                    </p>
                )}

                <div className="characters-grid-section__controls">
                    <Button onClick={() => handleChangePage(page - 1)} disabled={page === 1}>
                        ← Previous
                    </Button>
                    <span className="characters-grid-section__pagination-page">
                        Page {page} / {TOTAL_PAGES}
                    </span>
                    <Button onClick={() => handleChangePage(page + 1)} disabled={page === TOTAL_PAGES}>
                        Next →
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default CharactersGridSection;