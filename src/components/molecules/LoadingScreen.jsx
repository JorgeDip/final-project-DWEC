import { useState } from 'react';
import Spinner from '../atoms/Spinner.jsx';
import { pickRandom } from '../../services/utils.js';
import './LoadingScreen.css';

const PHRASES = [
    'Wubba lubba dub dub!',
    'Get schwifty!',
    "And that's the way the news goes!",
    "I'm Mr. Meeseeks, look at me!",
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
    "Jota, I don't want to alarm you, but I think your mother is a pickle.",
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