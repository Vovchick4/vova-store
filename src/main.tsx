import axios, { RawAxiosRequestConfig } from 'axios'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr/_internal'
import App from './App'
import './config/axios'
import './styles/index.css'

export const fetcher = (args: RawAxiosRequestConfig) => axios({ ...args }).then(res => res)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
  <SWRConfig value={{ fetcher }}>
    <App />
  </SWRConfig>
  //  </React.StrictMode>,
)
