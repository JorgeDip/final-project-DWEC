
import './CharacterPageHeader.css';
import Button from '../atoms/Button.jsx';

function CharacterPageHeader({ character, pad, handleBack }) {
    return (
        <header className="char-page__top">
            <nav className="char-page__crumbs">
                <span>Character directory</span> / <span>{character.origin?.name}</span> /{' '}
                <span className="chip chip--primary">{character.name} (#{pad(character.id)})</span>
            </nav>
            <Button variant="back" size="sm" onClick={() => handleBack()}>
                [ ← Back to directory ]
            </Button>
        </header>
    );
}

export default CharacterPageHeader;