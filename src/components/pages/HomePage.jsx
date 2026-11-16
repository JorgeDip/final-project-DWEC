import Button from '../atoms/Button.jsx';
function HomePage({ characters, error, page, setPage, setSelectedCharacter }) {
    return <main>
        {error && <p>{error.message}</p>}
        <div>
            <h1>Rick and Morty</h1>
            <span>Page {page}</span>
        </div>
        <Button onClick={() => localStorage.clear()}>Clear Cache</Button>
        {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
        {page < 42 && <Button onClick={() => setPage(page + 1)}>Next</Button>}
        <ul>
            {characters.map(character => (
                <li key={character.id}>
                    <h2>{character.name}</h2>
                    <img src={character.image} alt={character.name} />
                    <Button onClick={() => setSelectedCharacter(character)}>View Details</Button>
                </li>
            ))}
        </ul>
    </main>;
}

export default HomePage;