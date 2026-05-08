// 单条消息类型定义
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant"; // 用户 / AI
  timestamp: number;
}

// 会话（对话）类型定义
export interface Session {
  id: string;
  title: string; // 会话标题
  createTime: number;
  messages: Message[];
}