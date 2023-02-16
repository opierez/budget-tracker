import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from '../src/context/user'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);


