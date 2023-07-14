import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { colors } from './utils/colors.js'
import { HRStyles } from './utils/globalStylesMantine.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <MantineProvider
          theme={{
            colorScheme: 'light',
            colors: {
              brand: ['#a1a7ff', '#9094ff', '#7f82ff', '#6f6fff', '#5e5cff', '#4d4aff', '#3c37ff', '#322cd7', '#2720af', '#1d1587'],
            },
            spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
            primaryColor: 'brand',
            defaultRadius: 'sm',
            black:`${colors.secondary2}`,
            globalStyles: () => HRStyles(),
          }}
        >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
