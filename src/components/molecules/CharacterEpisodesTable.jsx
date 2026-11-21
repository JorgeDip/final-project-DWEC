import { useState } from 'react';
import Button from '../atoms/Button.jsx';
import './CharacterEpisodesTable.css';
function CharacterEpisodesTable({ character, episodes }) {
    const [page, setPage] = useState(1);

    return (<>
        <div className="char-page__tab-head">
            <div>
                <h2>Key missions and incidents log</h2>
                <p className="muted">Files where {character.name} altered the fabric of spacetime.</p>
            </div>
            <span className="chip chip--primary">Total logged: {character.episode?.length ?? 0} episodes</span>
        </div>

        <table className="char-page__table">
            <thead>
                <tr><th>Code</th><th>File title</th><th>Air date</th></tr>
            </thead>
            <tbody>
                {episodes.map((ep) => (
                    <tr key={ep.id}>
                        <td>{ep.episode}</td>
                        <td>{ep.name}</td>
                        <td>{ep.air_date}</td>
                    </tr>
                )).slice((page - 1) * 10, page * 10)}
            </tbody>
        </table>
        <div className="char-page__pagination">
            <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </Button>
            <span className="char-page__page-info">
                Page {page} of {Math.ceil(episodes.length / 10)}
            </span>
            <Button variant="secondary" onClick={() => setPage(page + 1)} disabled={page === Math.ceil(episodes.length / 10)}>
                Next
            </Button>
        </div>
    </>);
}

export default CharacterEpisodesTable;