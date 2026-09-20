import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import App from './App';

createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);