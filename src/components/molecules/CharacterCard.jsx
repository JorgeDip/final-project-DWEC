import Button from '../atoms/Button.jsx';
function CharacterCard({ character, setSelectedCharacter }) {
    return (
        <div className="character-cards__card">
            <img src={`https://pfygdubgszqehygueykn.supabase.co/storage/v1/object/public/rickandmorty/${character.id}.jpeg`} alt={character.name} loading="lazy" />
            <h2>{character.name}</h2>
            <Button onClick={() => setSelectedCharacter(character)}>View Details</Button>
        </div>
    );
}

export default CharacterCard;