import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { LoaderContextProvider } from './core/contexts/LoaderContext/LoaderContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <LoaderContextProvider>
      <App />
    </LoaderContextProvider>
  </StrictMode>
)
