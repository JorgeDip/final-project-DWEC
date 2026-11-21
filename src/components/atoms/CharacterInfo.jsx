import './CharacterInfo.css';
function CharacterInfo({ label, value, danger = false }) {
    return (
        <div className="info">
            <small>{label}</small>
            <strong className={danger ? 'info__danger' : ''}>{value ?? '—'}</strong>
        </div>

    );
}

export default CharacterInfo;