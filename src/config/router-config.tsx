import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Route, Layout } from '../components'

import urls from './urls'

const HomePage = lazy(() => import('../pages/Home'))
const ChatPage = lazy(() => import('../pages/Chat'))
const RoomChatPage = lazy(() => import('../pages/RoomChat'))
const LoginPage = lazy(() => import('../pages/Login'))
const RegisterPage = lazy(() => import('../pages/Register'))

const routerConfig = createBrowserRouter([
    {
        element: (<Route.Restricted><Layout.Auth /></Route.Restricted>),
        children: [
            {
                path: urls.login,
                element: <LoginPage />,
                errorElement: 'error',
            },
            {
                path: urls.register,
                element: <RegisterPage />,
                errorElement: 'error',
            }
        ]
    },
    {
        element: (<Layout />),
        errorElement: 'error',
        children: [
            {
                path: urls.home,
                element: <HomePage />,
                errorElement: 'error',
            }
        ]
    },
    {
        element: (<Route.Private><Layout.RoomChat /></Route.Private>),
        errorElement: 'error',
        children: [
            {
                path: urls.chat,
                element: <RoomChatPage />,
                errorElement: 'error',
            },
            {
                path: urls.chat + "/:chatId",
                element: <ChatPage />,
                errorElement: 'error',
            }
        ]
    }
])

export default routerConfig