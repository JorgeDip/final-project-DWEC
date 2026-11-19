import Button from '../atoms/Button.jsx';
function CharacterCard({ character, setSelectedCharacter }) {
    // alive / dead / unknown, para la clase del color
    const status = character.status?.toLowerCase() ?? 'unknown';

    return (
        <article className="character-card">
            <div className="character-card__media">
                <img
                    className="character-card__image" src={`https://pfygdubgszqehygueykn.supabase.co/storage/v1/object/public/rickandmorty/${character.id}.jpeg`} alt={character.name} loading="lazy"/>
                <span className="character-card__badge character-card__badge--id">
                    #{String(character.id).padStart(3, '0')}
                </span>
                <span className={`character-card__badge character-card__badge--status character-card__badge--${status}`}>
                    {character.status}
                </span>
            </div>

            <div className="character-card__body">
                <h2 className="character-card__name">{character.name}</h2>
                <p className="character-card__species">{character.species}</p>

                <dl className="character-card__info">
                    <div className="character-card__info-item">
                        <dt>Origin</dt>
                        <dd>{character.origin?.name}</dd>
                    </div>
                    <div className="character-card__info-item">
                        <dt>Location</dt>
                        <dd>{character.location?.name}</dd>
                    </div>
                </dl>

                <Button onClick={() => setSelectedCharacter(character)}>View details →</Button>
            </div>
        </article>
    );
}

export default CharacterCard;