import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// TypeScript non-null assertion operator to tell TypeScript that getElementById will not return null
const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)