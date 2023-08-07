import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { HRStyles } from './utils/globalStylesMantine.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <MantineProvider
            theme={{
              colorScheme: 'light',
              colors: {
                brand: ['#b9c1fc', '#a6acfd', '#9298fd', '#7f83fe', '#6c6efe', '#585afe', '#4545ff', '#3a3add', '#3030bb', '#252599'],
                gray: ['#f1eeef', '#e0dcdd', '#cec9cc', '#bdb7bb', '#aca5a9', '#9a9298', '#898086', '#756c71', '#60585d', '#4c4448'],
              },
              primaryColor: 'brand',
              defaultRadius: 'sm',
              globalStyles: () => HRStyles(),
            }}
          >
          <App />
        </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
