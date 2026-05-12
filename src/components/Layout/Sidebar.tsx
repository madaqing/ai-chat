// 左侧会话栏
import { useSessionStore } from "../../store/sessionStore";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {
    sessions,
    currentSessionId,
    createSession,
    setCurrentSession,
    deleteSession,
    logout,
    user,
  } = useSessionStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-3 h-full flex flex-col">
      {/* 用户信息 */}
      <div className="mb-4 text-center">
        <div className="text-sm font-medium">{user?.username}</div>
        <div className="text-xs text-gray-500">{user?.email}</div>
      </div>

      {/* 新建对话 */}
      <button
        onClick={createSession}
        className="w-full py-2 rounded-lg bg-blue-500 text-white mb-4 hover:bg-blue-600 transition"
      >
        新建对话
      </button>

      {/* 会话列表 */}
      <div className="flex-1 overflow-auto space-y-1">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setCurrentSession(session.id)}
            className={`p-2 rounded cursor-pointer flex justify-between items-center
              ${currentSessionId === session.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            <span className="truncate">{session.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSession(session.id);
              }}
              className="text-red-400 text-xs"
            >
              ✕
            </button>
          </div>
        ))}

        {sessions.length === 0 && (
          <div className="text-gray-400 text-center mt-10">暂无会话</div>
        )}
      </div>

      {/* 登出按钮 */}
      <button
        onClick={handleLogout}
        className="w-full py-2 rounded-lg bg-red-500 text-white mt-4 hover:bg-red-600 transition"
      >
        登出
      </button>
    </div>
  );
};

export default Sidebar;