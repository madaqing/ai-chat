// 左侧会话栏
import { useSessionStore } from "../../store/sessionStore";

const Sidebar = () => {
  const {
    sessions,
    currentSessionId,
    createSession,
    setCurrentSession,
    deleteSession,
  } = useSessionStore();

  return (
    <div className="p-3 h-full flex flex-col">
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
    </div>
  );
};

export default Sidebar;