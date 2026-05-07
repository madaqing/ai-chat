//  整体左右布局
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden">
      {/* 左侧侧边栏 */}
      <aside className="w-full md:w-64 h-full border-b border-gray-200 dark:border-gray-700 md:border-b-0 md:border-r flex-shrink-0">
        <Sidebar />
      </aside>
      {/* 右侧路由出口 聊天主区域 */}
      <main className="flex-1 h-full overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout