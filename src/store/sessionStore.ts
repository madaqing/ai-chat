// 会话管理（新建/切换/删除）
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, Message } from "../types/chat";

interface SessionState {
  sessions: Session[];
  currentSessionId: string | null;

  // 新建会话
  createSession: () => void;
  // 切换会话
  setCurrentSession: (id: string) => void;
  // 删除会话
  deleteSession: (id: string) => void;
  // 给当前会话添加消息
  addMessageToCurrentSession: (message: Message) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      // 新建对话
      createSession: () => {
        const newSession: Session = {
          id: Date.now().toString(),
          title: `对话 ${get().sessions.length + 1}`,
          createTime: Date.now(),
          messages: [],
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
          currentSessionId: newSession.id,
        }));
      },

      // 切换当前会话
      setCurrentSession: (id) => set({ currentSessionId: id }),

      // 删除会话
      deleteSession: (id) =>
        set((state) => {
          const filtered = state.sessions.filter((s) => s.id !== id);
          return {
            sessions: filtered,
            currentSessionId:
              state.currentSessionId === id
                ? filtered.length > 0
                  ? filtered[0].id
                  : null
                : state.currentSessionId,
          };
        }),

      // 给当前会话追加消息（核心！）
      addMessageToCurrentSession: (message) =>
        set((state) => {
          const sessionId = state.currentSessionId;
          if (!sessionId) return state;

          return {
            sessions: state.sessions.map((s) =>
              s.id === sessionId
                ? { ...s, messages: [...s.messages, message] }
                : s
            ),
          };
        }),
    }),
    {
      name: "ai-sessions-storage", // localStorage 持久化 key
    }
  )
);

// 获取当前正在打开的会话
export const useCurrentSession = () => {
  const { sessions, currentSessionId } = useSessionStore();
  return sessions.find((s) => s.id === currentSessionId) || null;
};