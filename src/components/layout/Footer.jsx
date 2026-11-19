import './Footer.css';
function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content container">
                <p className="footer__copy">&copy; 2026 Rick and Morty</p>
                <p className="footer__source">
                    Powered by{' '}
                    <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">
                        Rick and Morty API
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;