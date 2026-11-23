import { useState, useEffect } from 'react';
import Button from '../atoms/Button.jsx';
import './CharacterTabTable.css';

const PAGE_SIZE = 10;
const IMG_BASE = 'https://pfygdubgszqehygueykn.supabase.co/storage/v1/object/public/rickandmorty';

function CharacterTabTable({ tab = 0, character, episodes = null, variants = null, handleChangeCharacter }) {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1); // Reset to first page when character or episodes change
    }, [character, episodes, variants]);


    const items = episodes ?? variants ?? [];
    const totalLogged = items.length;
    const totalPages = Math.max(1, Math.ceil(totalLogged / PAGE_SIZE));

    return (<>
        <div className="char-page__tab-head">
            <div>
                <h2>Key missions and incidents log</h2>
                <p className="muted">Files where {character.name} altered the fabric of spacetime.</p>
            </div>
            <span className="chip chip--primary">Total logged: {totalLogged} {episodes ? 'episodes' : 'variants'}</span>
        </div>

        <table className="char-page__table">
            <thead className="char-page__table-head">
                {episodes !== null ? (
                    <tr>
                        <th>Episode</th>
                        <th>Name</th>
                        <th>Air date</th>
                    </tr>
                ) : null}

                {variants !== null ? (
                    <tr>
                        <th>Variant Image</th>
                        <th>Variant Name</th>
                        <th>Origin</th>
                        <th>Age</th>
                        <th>Threat Level</th>
                    </tr>
                ) : null}
            </thead>
            <tbody>
                {tab === 0 ? (
                    episodes?.length > 0 ? episodes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((episode) => (
                        <tr key={episode.id}>
                            <td>{episode.episode}</td>
                            <td>{episode.name}</td>
                            <td>{episode.air_date}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="3">No episodes available</td></tr>
                    )
                ) : (
                    variants?.length > 0 ? variants.filter((v) => v.id !== character.id).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((variant) => (
                        <tr key={variant.id} onClick={() => handleChangeCharacter(variant.id)}>
                            <td><img src={`${IMG_BASE}/${variant.id}.jpeg`} alt={variant.name} className="char-table__image" /></td>
                            <td>{variant.name}</td>
                            <td>{variant.origin?.name}</td>
                            <td>{variant.age}</td>
                            <td className={`char-page__threat--${variant.threat_level.toLowerCase()}`}>{variant.threat_level}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5">No variants available</td></tr>
                    )
                )}
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