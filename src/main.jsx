import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './css/dashboard-styles.css'
import './css/styles.css'
import '@fontsource/poppins/400.css';  
import '@fontsource/poppins/600.css';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
