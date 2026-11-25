import Button from "../atoms/Button";
import CharacterCard from "../molecules/CharacterCard";
import "./CharactersGridSection.css";


function CharactersGridSection({ page, handleChangePage, characters, setSelectedCharacter, pageSize = 20, totalCharacters = 826 }) {

    const TOTAL_PAGES = Math.max(1, Math.ceil(totalCharacters / pageSize));

    const firstItem = (page - 1) * pageSize + 1;
    const lastItem = (page - 1) * pageSize + characters.length;

    return (
        <div className="container characters-grid-section">

            <div className="characters-grid-section__grid">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} setSelectedCharacter={setSelectedCharacter} />
                ))}
            </div>

            <div className="characters-grid-section__pagination">
                {characters.length > 0 && (
                    <p className="characters-grid-section__summary">
                        Showing <span>{firstItem} - {lastItem}</span> of <span>{totalCharacters}</span> characters
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