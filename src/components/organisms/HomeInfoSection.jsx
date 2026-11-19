import UsersGroupIcon from '../icons/UsersGroupIcon';
import PlanetIcon from '../icons/PlanetIcon';
import FolderIcon from '../icons/FolderIcon';

import './HomeInfoSection.css';
function HomeInfoSection() {
    return (
        <header className="home-info-section container">
            <div className="home-info-section__item-container">
                <div className="home-info-section__item home-info-section__item--version">Database of the citadel V4.2</div>
                <div className="home-info-section__item home-info-section__item--dimension">Actual Dimension: <span className="home-info-section__item--dimension-value"> Earth (C-137)</span></div>
                <div className="home-info-section__item home-info-section__item--protocol">Protocol: <span className="home-info-section__item--protocol-value">CF-CENTRAL-CURVE//SCAN</span></div>
            </div>

            <div className="home-info-section__data">
                <div className="home-info-section__data-item home-info-section__data-item--characters">
                    <div className="home-info-section__data-item--label">
                        Characters <UsersGroupIcon />
                    </div>
                    <span className="home-info-section__data-item--value"> 826</span>
                </div>
                <div className="home-info-section__data-item home-info-section__data-item--locations">
                    <div className="home-info-section__data-item--label">
                        Locations <PlanetIcon />
                    </div>
                    <span className="home-info-section__data-item--value"> 126</span>
                </div>
                <div className="home-info-section__data-item home-info-section__data-item--episodes">
                    <div className="home-info-section__data-item--label">
                        Episodes <FolderIcon />
                    </div>
                    <span className="home-info-section__data-item--value"> 51</span>
                </div>
            </div>
        </header>
    );
}

export default HomeInfoSection;