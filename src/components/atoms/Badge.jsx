import './Badge.css';
function Badge({ children, status }) {
    return (
        <span className={`character-card__badge ${status ? `character-card__badge--status character-card__badge--${status} ` : 'character-card__badge--id'}`}>
            {children}
        </span>
    );
}

export default Badge;