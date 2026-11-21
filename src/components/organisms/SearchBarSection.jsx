import './SearchBarSection.css';
import SearchIcon from '../icons/SearchIcon.jsx';

function SearchBarSection({ handleInputChange }) {
    return (
        <section className="search-bar-section">
            <div className="container">
                <label className="search-bar-section__field">
                    <SearchIcon />
                    <input className="search-bar-section__input" type="text" placeholder="Search characters..." onChange={handleInputChange} />
                </label>
            </div>
        </section >
    );
}

export default SearchBarSection;