import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

// ReactDOM.render(<App className={styles}/>, document.getElementById('root'));
// registerServiceWorker();


ReactDOM.render(
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
