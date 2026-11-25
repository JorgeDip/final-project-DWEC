import { useEffect } from "react";
import "./ErrorToast.css";

export default function ErrorToast({ error, onClose, autoClose = 6000 }) {
    // Normaliza: array de strings, string suelto o Error
    const messages = Array.isArray(error)
        ? error.filter(Boolean).map(String)
        : error
            ? [error.message || String(error)]
            : [];

    const hasErrors = messages.length > 0;

    useEffect(() => {
        if (!hasErrors || !autoClose) return;
        const id = setTimeout(onClose, autoClose);
        return () => clearTimeout(id);
    }, [error, hasErrors, autoClose, onClose]);

    if (!hasErrors) return null;

    return (
        <div className="error-toast" role="alert">
            <span className="error-toast__icon" aria-hidden="true">!</span>

            <div className="error-toast__content">
                <p className="error-toast__title">
                    {messages.length > 1 ? `ERRORES (${messages.length})` : "ERROR"}
                </p>

                {messages.length === 1 ? (
                    <p className="error-toast__message">{messages[0]}</p>
                ) : (
                    <ul className="error-toast__list">
                        {messages.map((msg, i) => (
                            <li key={i} className="error-toast__message">{msg}</li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                className="error-toast__close"
                onClick={onClose}
                aria-label="Cerrar error"
            >
                ×
            </button>
        </div>
    );
}