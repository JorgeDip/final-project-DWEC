import './Button.css';

function Button({ children, onClick, disabled, variant = 'card', size, block, className = '' }) {
    const classes = [
        'btn',
        `btn--${variant}`,
        size && `btn--${size}`,
        block && 'btn--block',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            <span className="btn__label">{children}</span>
        </button>
    );
}

export default Button;