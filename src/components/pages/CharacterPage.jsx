import { useEffect, useState } from 'react';
import { getCharacterById, getEpisodeById } from '../../services/api.js';

import Button from '../atoms/Button.jsx';
import Info from '../atoms/CharacterInfo.jsx';
import CharacterPageHeader from '../molecules/CharacterPageHeader.jsx';
import CharacterEpisodesTable from '../molecules/CharacterEpisodesTable.jsx';
import PageTemplate from '../templates/PageTemplate.jsx';
import Footer from '../layout/Footer.jsx';
import './CharacterPage.css';

const IMG_BASE = 'https://pfygdubgszqehygueykn.supabase.co/storage/v1/object/public/rickandmorty';
const STATUS = { Alive: 'Alive', Dead: 'Dead', unknown: 'Unknown' };
const THREAT = {
    Low: { pct: 20, label: 'Low' },
    Medium: { pct: 50, label: 'Medium' },
    High: { pct: 75, label: 'High' },
    Extreme: { pct: 99, label: 'Multiversal extinction' },
};
const TABS = ['Featured episodes', 'Multiversal variants', 'Registered inventions', 'Links & allies'];
const pad = (n) => String(n).padStart(3, '0');

function CharacterPage({ characterId, setSelectedCharacter, setError, error }) {
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);

    const [character, setCharacter] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        getCharacterById(characterId)
            .then((data) => {
                setCharacter(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [characterId]);

    // Fetch episodes for the character when the character data is available
    useEffect(() => {
        if (character) {
            character.episode.forEach((epId) => {
                getEpisodeById(epId)
                    .then((data) => {
                        setEpisodes((prevEpisodes) => [...prevEpisodes, data]);
                    })
                    .catch((err) => {
                        console.error(`Error fetching episode with id ${epId}:`, err);
                    });
            });

            // Fetch related characters
            const relatedIds = character.related_character_ids || [];
            Promise.all(relatedIds.map((id) => getCharacterById(id)))
                .then((relatedCharacters) => {
                    setRelated(relatedCharacters);
                })
                .catch((err) => {
                    console.error('Error fetching related characters:', err);
                });
        }
    }, [character]);

    if (loading) {
        return (
            <div className="char-page">
                <PageTemplate header={<h1>Loading character...</h1>} footer={<Footer />}>
                    <p className="muted">Please wait while we fetch the character data.</p>
                </PageTemplate>
            </div>
        );
    }


    const handleBack = () => {
        setError(null);
        setSelectedCharacter(null);
    };

    const handleChangeCharacter = (id) => {
        setError(null);
        setSelectedCharacter(id);
        setEpisodes([]); // Clear episodes when changing character
    }

    const threat = THREAT[character.threat_level] ?? { pct: 10, label: character.threat_level ?? '—' };
    const ref = `C137-${pad(character.id)}`;


    return (
        <PageTemplate header={<CharacterPageHeader character={character} pad={pad} handleBack={handleBack} />} footer={<Footer />}>
            <div className="char-page">
                <div className="char-page__content">
                    <div className="char-page__alert">
                        <span>● Security level // Citadel classified Omega-9</span>
                        <span>ID: {ref} · LOC: {character.location?.name}</span>
                    </div>

                    <section className="panel char-page__hero">
                        <aside className="char-page__side">
                            <div className="char-page__photo">
                                <img src={`${IMG_BASE}/${character.id}.jpeg`} alt={character.name} loading="lazy" />
                                <span className="char-page__photo-tag">DNA: primordial</span>
                            </div>

                            <dl className="char-page__rows">
                                <div>
                                    <dt>Biological status</dt>
                                    <dd className={`status--${character.status}`}>● {STATUS[character.status] ?? character.status}</dd>
                                </div>
                                <div>
                                    <dt>Species / gender</dt>
                                    <dd>{character.species} / {character.gender}{character.age ? ` / ~${character.age}y` : ''}</dd>
                                </div>
                                <div>
                                    <dt>Serial</dt>
                                    <dd>PG-{character.id}-OMEGA</dd>
                                </div>
                            </dl>

                            <div className="char-page__radar">
                                <small>Dimensional origin radar</small>
                                <strong>{character.origin?.name}</strong>
                            </div>

                            <div className="char-page__threat">
                                <div className="char-page__threat-head">
                                    <span>⚠ Threat level</span>
                                    <span>{threat.label}</span>
                                </div>
                                <div className="char-page__bar"><div style={{ width: `${threat.pct}%` }} /></div>
                            </div>

                            <Button variant="primary" block>Track portal gun</Button>
                            <div className="char-page__btn-row">
                                <Button variant="secondary" size="sm" block>Clone history</Button>
                                <Button variant="neutral" size="sm" block>PDF file</Button>
                            </div>
                        </aside>

                        <div className="char-page__main">
                            <div className="char-page__chips">
                                <span className="chip chip--secondary">Ref: {ref}</span>
                                <span className="chip chip--danger">Red priority</span>
                            </div>
                            <h1 className="char-page__title">{character.name}</h1>
                            <p className="char-page__desc">{character.description}</p>

                            <div className="char-page__grid">
                                <Info label="Dimensional origin" value={character.origin} />
                                <Info label="Current residence" value={character.current_residence ?? character.location?.name} />
                                <Info label="Mental state" value={character.mental_state} />
                                <Info label="Citadel status" value={character.citadel_status} danger />
                            </div>
                        </div>
                    </section>

                    <section className="panel">
                        <div className="char-page__tabs" role="tablist">
                            {TABS.map((t, i) => (
                                <button
                                    key={t}
                                    role="tab"
                                    aria-selected={tab === i}
                                    className={`char-page__tab ${tab === i ? 'char-page__tab--active' : ''}`}
                                    onClick={() => setTab(i)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {tab === 0 ? (
                            <CharacterEpisodesTable episodes={episodes} character={character} />
                        ) : (
                            <p className="muted">Section under construction.</p>
                        )}
                        {error && <p className="char-page__error">{error.message}</p>}
                    </section>

                    <section className="panel">
                        <h3 className="char-page__section-title">Quick teleport: explore other subjects</h3>
                        <div className="char-page__related">
                            {related.map((r) => (
                                <button key={r.id} className="char-page__rel" onClick={() => handleChangeCharacter(r.id)}>
                                    <img src={`${IMG_BASE}/${r.id}.jpeg`} alt={r.name} loading="lazy" />
                                    <span className="char-page__rel-text">
                                        <small>Subject #{pad(r.id)}</small>
                                        <strong>{r.name}</strong>
                                        <em>{r.species} · {r.origin?.name}</em>
                                    </span>
                                    <span aria-hidden>›</span>
                                </button>
                            )).slice(0, 3)}
                        </div>
                    </section>
                </div>
            </div>
        </PageTemplate>
    );
}


export default CharacterPage;