import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import routerConfig from './config/router-config'
import { useAuth } from './hooks'

function App() {
  useAuth({ url: "/auth/get-user" }).trigger()

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <RouterProvider router={routerConfig} />
    </Suspense>
  )
}

export default App
