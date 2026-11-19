import './SearchBarSection.css';
function SearchBarSection() {
    return (
        <section className="search-bar-section">
            <div className="container">
                <input className="search-bar-section__input" type="text" placeholder="Search characters..." />
            </div>
        </section >
    );
}

export default SearchBarSection;