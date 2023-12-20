import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Authcontexts from './contexts/Authcontexts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Authcontexts>
  <App />

  </Authcontexts>
  </React.StrictMode>,
)
