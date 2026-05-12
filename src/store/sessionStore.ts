// 用 Zustand（React 状态管理库）写的AI 聊天会话管理器，
// 功能和 ChatGPT 侧边栏一模一样：
// 管理多个对话、切换、删除、发消息、刷新不丢失（持久化）。

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, Message } from "../types/chat";

// 定义用户类型
interface User {
  id: string;
  email: string;
  username: string;
}

// 定义状态类型（规则）：有什么数据、有什么方法。
interface SessionState {
  sessions: Session[]; // 所有会话列表
  currentSessionId: string | null; // 当前打开的会话ID

  // 认证相关
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;

  // 新建会话
  createSession: () => void;
  // 切换会话
  setCurrentSession: (id: string) => void;
  // 删除会话
  deleteSession: (id: string) => void;
  // 给当前会话添加消息
  addMessageToCurrentSession: (message: Message) => void;

  // 认证方法
  login: (user: User, token: string) => void;
  logout: () => void;
}
// 创建状态仓库（核心）
export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      // 认证相关
      isAuthenticated: false,
      user: null,
      token: null,

      // 新建对话
      createSession: () => {
        const newSession: Session = {
          id: Date.now().toString(), // 用时间戳当唯一ID
          title: `对话 ${get().sessions.length + 1}`,
          createTime: Date.now(),
          messages: [],
        };

        set((state) => ({
          sessions: [...state.sessions, newSession], // 追加到列表
          currentSessionId: newSession.id, // 自动切换到新会话
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
                ? { ...s, messages: [...s.messages, message] } // 追加消息
                : s
            ),
          };
        }),

      // 登录
      login: (user, token) =>
        set({
          isAuthenticated: true,
          user,
          token,
        }),

      // 登出
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          sessions: [],
          currentSessionId: null,
        }),
    }),
    {
      name: "ai-sessions-storage", // localStorage 持久化 key
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// 获取当前正在打开的会话
export const useCurrentSession = () => {
  const { sessions, currentSessionId } = useSessionStore();
  return sessions.find((s) => s.id === currentSessionId) || null;
};