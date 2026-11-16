import Button from '../atoms/Button.jsx';
function CharacterPage({ character, setSelectedCharacter, error }) {
    return <>
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <Button onClick={() => setSelectedCharacter(null)}>Back</Button>
        {error && <p>{error.message}</p>}
    </>
}

export default CharacterPage;