import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';
import App from './components/App';
import configureStore from './store/configureStore';
const store = configureStore();
import registerServiceWorker from './registerServiceWorker';

import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();