import Button from '../atoms/Button.jsx';
import CharacterCard from '../molecules/CharacterCard.jsx';
import PageTemplate from '../templates/PageTemplate.jsx';
import Footer from '../layout/Footer.jsx';
import './HomePage.css';
import HomeInfoSection from '../organisms/HomeInfoSection.jsx';
import SearchBarSection from '../organisms/SearchBarSection.jsx';
import CharactersGridSection from '../organisms/CharactersGridSection.jsx';

function HomePage({ characters, error, page, handleChangePage, setSelectedCharacter }) {
    return (
        <PageTemplate header={<HomeInfoSection />} footer={<Footer />}>

            <SearchBarSection />
            <CharactersGridSection error={error} page={page} handleChangePage={handleChangePage} characters={characters} setSelectedCharacter={setSelectedCharacter} />

        </PageTemplate>
    );
}

export default HomePage;