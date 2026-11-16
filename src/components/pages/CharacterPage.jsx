import Button from '../atoms/Button.jsx';
import { useEffect } from 'react';
import { getCharacterById } from '../../services/api.js';

function CharacterPage({ character, setSelectedCharacter, setError, error }) {

    // Fetch the selected character details when a character is selected
    const selectedId = character?.id;
    useEffect(() => {
        if (!selectedId) return;

        getCharacterById(selectedId)
            .then(data => setSelectedCharacter(data))
            .catch(error => setError(error));
    }, [selectedId]);

    return <>
        <h1>{character.name}</h1>
        <img src={`https://pfygdubgszqehygueykn.supabase.co/storage/v1/object/public/rickandmorty/${character.id}.jpeg`} alt={character.name} loading="lazy" />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <Button onClick={() => setSelectedCharacter(null)}>Back</Button>
        {error && <p>{error.message}</p>}
    </>
}

export default CharacterPage;