// 聊天状态（输入/加载）
import { create } from "zustand";

interface ChatState {
  input: string;
  isLoading: boolean;

  // 输入框内容
  setInput: (val: string) => void;
  // 加载中（AI思考中）
  setIsLoading: (val: boolean) => void;
  // 清空输入
  clearInput: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  input: "",
  isLoading: false,

  setInput: (val) => set({ input: val }),
  setIsLoading: (val) => set({ isLoading: val }),
  clearInput: () => set({ input: "" }),
}));