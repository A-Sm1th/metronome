import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Metronome from './Metronome.js';

ReactDOM.render(<Metronome />, document.getElementById('root'));
registerServiceWorker();
