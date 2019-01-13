import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();