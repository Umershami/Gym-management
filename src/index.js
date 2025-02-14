// Import necessary React packages
import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this line to import from 'react-dom/client'
import App from './App';  // Import your App component
import './index.css';  // Import your CSS file

// Get the root element in your HTML file (usually <div id="root"></div>)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component using the new method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
