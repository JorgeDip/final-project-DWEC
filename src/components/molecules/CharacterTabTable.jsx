import { useState, useEffect } from 'react';
import Button from '../atoms/Button.jsx';
import './CharacterTabTable.css';
function CharacterTabTable({ character, episodes = null, variants = null }) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1); // Reset to first page when character or episodes change
    }, [character, episodes, variants]);
    console.log('CharacterTabTable props:', { character, episodes, variants });

    const totalLogged = episodes !== null ? episodes.length : variants !== null ? variants.length : 0;
    const totalPages = Math.ceil(totalLogged / 10);

    return (<>
        <div className="char-page__tab-head">
            <div>
                <h2>Key missions and incidents log</h2>
                <p className="muted">Files where {character.name} altered the fabric of spacetime.</p>
            </div>
            <span className="chip chip--primary">Total logged: {totalLogged} episodes</span>
        </div>

        <table className="char-page__table">
            <thead>
                <tr><th>Code</th><th>File title</th><th>Air date</th></tr>
            </thead>
            <tbody>
                {episodes !== null && episodes.slice((page - 1) * 10, page * 10).map((episode) => (
                    <tr key={episode.id}>
                        <td>{episode.episode}</td>
                        <td>{episode.name}</td>
                        <td>{episode.air_date}</td>
                    </tr>
                ))}


                {variants !== null && variants.slice((page - 1) * 10, page * 10).map((variant) => (
                    <tr key={variant.id}>
                        <td>{variant.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="char-page__pagination">
            <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </Button>
            <span className="char-page__page-info">
                Page {page} of {totalPages}
            </span>
            <Button variant="secondary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                Next
            </Button>
        </div>
    </>);
}

export default CharacterTabTable;