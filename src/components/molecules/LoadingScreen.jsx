import { useState } from 'react';
import Spinner from '../atoms/Spinner.jsx';
import { pickRandom } from '../../services/utils.js';
import './LoadingScreen.css';

const PHRASES = [
    'Wubba lubba dub dub!',
    "Don't forget to add a loading phrase here.",
    "There's a 5% chance for the loading icon to change.",
    "I'm Mr. Meeseeks, look at me!",
    "They told me to add a loading phrase here.",
    'Pickle Rick!',
    'Opening a portal to dimension C-137...',
    'Calibrating the portal gun...',
    'Consulting the Citadel database...',
    'Decrypting classified Omega-9 files...',
    'Searching the multiverse for this subject...',
    'PAPAYAAAA',
    "Rick says this won't take long. He is lying.",
    "Barbara, please let me see the kids. At least give me the dog back.",
    "People understimate the taste of tungsten for breakfast.",
    "I like trains",
    "MOTHERFUCKERS! YOU KILLED KENNY! YOU BASTARDS!",
];

function LoadingScreen() {
    // lazy initial state: the phrase is picked only once, when the screen appears
    const [phrase] = useState(() => pickRandom(PHRASES, 1)[0]);

    return (
        <div className="loading-screen">
            <Spinner label="Loading character..." />
            <p className="loading-screen__phrase">{phrase}</p>
        </div>
    );
}

export default LoadingScreen;