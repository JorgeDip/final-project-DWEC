import './Button.css';
function Button({ children, onClick, disabled }) {
    return <button className="btn btn--card" onClick={onClick} disabled={disabled}>
        <span className="btn__label">{children}</span>
    </button>;
}

export default Button;