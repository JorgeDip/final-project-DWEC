import './Button.css';
function Button({ children, onClick }) {
    return <button className="btn btn--card" onClick={onClick}>
        <span className="btn__label">{children}</span>
    </button>;
}

export default Button;