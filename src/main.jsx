import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { MantineProvider } from '@mantine/core'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <MantineProvider
          theme={{
            // Override any other properties from default theme
            fontFamily: 'sans-serif',
            fontWeight: '400',
            spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
          }}
        >
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
