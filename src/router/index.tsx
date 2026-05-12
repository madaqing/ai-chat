import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import GuestRoute from '../components/GuestRoute';
import ChatPage from '../pages/ChatPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    // 只有没有注册登录的用户才能访问登录页
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    )
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    )
  },
  // 只有注册登录的用户才能访问聊天页
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ChatPage />
      }
    ]
  },
  // 其他路径显示404页面
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;