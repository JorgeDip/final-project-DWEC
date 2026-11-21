import { useEffect, useMemo, useState } from 'react';
import Button from '../atoms/Button.jsx';
import PageTemplate from '../templates/PageTemplate.jsx';
import Footer from '../layout/Footer.jsx';
import enriched from '../../data/characters_enriched.json';
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

function CharacterPage({ character, setSelectedCharacter, setError, error }) {
    const c = useMemo(
        () => enriched.find((x) => x.id === character.id) ?? character,
        [character]
    );
    const [tab, setTab] = useState(0);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTab(0);
        setLoading(true);
        const ids = (c.episode ?? []).slice(0, 5).join(',');
        if (!ids) {
            setEpisodes([]);
            setLoading(false);
            return;
        }
        fetch(`https://rickandmortyapi.com/api/episode/${ids}`)
            .then((r) => {
                if (!r.ok) throw new Error('Could not load episodes');
                return r.json();
            })
            .then((d) => setEpisodes(Array.isArray(d) ? d : [d]))
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [c.id]);

    const handleBack = () => {
        setError(null);
        setSelectedCharacter(null);
    };

    const threat = THREAT[c.threat_level] ?? { pct: 10, label: c.threat_level ?? '—' };
    const related = (c.related_character_ids ?? [])
        .map((id) => enriched.find((x) => x.id === id))
        .filter(Boolean)
        .slice(0, 3);
    const ref = `C137-${pad(c.id)}`;

    const header = (
        <div className="char-page__top">
            <nav className="char-page__crumbs">
                <span>Character directory</span> / <span>{c.origin?.name}</span> /{' '}
                <span className="chip chip--primary">{c.name} (#{pad(c.id)})</span>
            </nav>
            <Button variant="back" size="sm" onClick={handleBack}>
                [ ← Back to directory ]
            </Button>
        </div>
    );

    return (
        <div className="char-page">
            <PageTemplate header={header} footer={<Footer />}>
                <div className="char-page__content">
                    <div className="char-page__alert">
                        <span>● Security level // Citadel classified Omega-9</span>
                        <span>ID: {ref} · LOC: {c.location?.name}</span>
                    </div>

                    <section className="panel char-page__hero">
                        <aside className="char-page__side">
                            <div className="char-page__photo">
                                <img src={`${IMG_BASE}/${c.id}.jpeg`} alt={c.name} loading="lazy" />
                                <span className="char-page__photo-tag">DNA: primordial</span>
                            </div>

                            <dl className="char-page__rows">
                                <div>
                                    <dt>Biological status</dt>
                                    <dd className={`status--${c.status}`}>● {STATUS[c.status] ?? c.status}</dd>
                                </div>
                                <div>
                                    <dt>Species / gender</dt>
                                    <dd>{c.species} / {c.gender}{c.age ? ` / ~${c.age}y` : ''}</dd>
                                </div>
                                <div>
                                    <dt>Serial</dt>
                                    <dd>PG-{c.id}-OMEGA</dd>
                                </div>
                            </dl>

                            <div className="char-page__radar">
                                <small>Dimensional origin radar</small>
                                <strong>{c.origin?.name}</strong>
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
                            <h1 className="char-page__title">{c.name}</h1>
                            <p className="char-page__desc">{c.description}</p>

                            <div className="char-page__grid">
                                <Info label="Dimensional origin" value={c.origin?.name} />
                                <Info label="Current residence" value={c.current_residence ?? c.location?.name} />
                                <Info label="Mental state" value={c.mental_state} />
                                <Info label="Citadel status" value={c.citadel_status} danger />
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
                            <>
                                <div className="char-page__tab-head">
                                    <div>
                                        <h2>Key missions and incidents log</h2>
                                        <p className="muted">Files where {c.name} altered the fabric of spacetime.</p>
                                    </div>
                                    <span className="chip chip--primary">Total logged: {c.episode?.length ?? 0} episodes</span>
                                </div>
                                {loading ? <p className="muted">Loading episodes…</p> : (
                                    <table className="char-page__table">
                                        <thead>
                                            <tr><th>Code</th><th>File title</th><th>Air date</th></tr>
                                        </thead>
                                        <tbody>
                                            {episodes.map((e) => (
                                                <tr key={e.id}>
                                                    <td className="code">{e.episode}</td>
                                                    <td>{e.name}</td>
                                                    <td>{e.air_date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        ) : (
                            <p className="muted">Section under construction.</p>
                        )}
                        {error && <p className="char-page__error">{error.message}</p>}
                    </section>

                    <section className="panel">
                        <h3 className="char-page__section-title">Quick teleport: explore other subjects</h3>
                        <div className="char-page__related">
                            {related.map((r) => (
                                <button key={r.id} className="char-page__rel" onClick={() => setSelectedCharacter(r)}>
                                    <img src={`${IMG_BASE}/${r.id}.jpeg`} alt={r.name} loading="lazy" />
                                    <span className="char-page__rel-text">
                                        <small>Subject #{pad(r.id)}</small>
                                        <strong>{r.name}</strong>
                                        <em>{r.species} · {r.origin?.name}</em>
                                    </span>
                                    <span aria-hidden>›</span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </PageTemplate>
        </div>
    );
}

function Info({ label, value, danger }) {
    return (
        <div className="info">
            <small>{label}</small>
            <strong className={danger ? 'info__danger' : ''}>{value ?? '—'}</strong>
        </div>
    );
}

export default CharacterPage;