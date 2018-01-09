import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './features/ui/components/ScrollToTop/ScrollToTop';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

//global styles
import 'normalize.css/normalize.css';
import 'react-select/dist/react-select.css';
import 'react-simple-dropdown/styles/Dropdown.css';
import 'react-datetime/css/react-datetime.css';
import './index.scss';

export default function (Routes, Store) {
  ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <ScrollToTop>
                <App Routes={Routes} />
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
};
