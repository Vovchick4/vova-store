import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useAuth } from './hooks'
import routerConfig from './config/router-config'

export default function App() {
  useAuth({ url: "/auth/get-user" }).trigger()

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <RouterProvider router={routerConfig} />
    </Suspense>
  )
}

