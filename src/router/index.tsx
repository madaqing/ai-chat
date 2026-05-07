import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import ChatPage from '../pages/ChatPage'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ChatPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router