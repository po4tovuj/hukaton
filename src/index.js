import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(
  <Router>
    <Route path="/" basename={process.env.PUBLIC_URL} component={App} />
  </Router>,
  document.getElementById('root'),
);
