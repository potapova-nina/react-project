import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/home/home'
import './index.css'
import { Provider } from './provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
    <Home />
    </Provider>
  </React.StrictMode>,
)
