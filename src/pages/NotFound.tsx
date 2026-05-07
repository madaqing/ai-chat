import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="text-6xl font-bold text-blue-600">404</div>
        <div className="mt-4 text-2xl font-semibold text-gray-900">页面未找到</div>
        <p className="mt-3 text-gray-500">
          你访问的页面不存在，可能已被移除或链接输入错误。
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center mt-8 rounded-xl bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default NotFound
