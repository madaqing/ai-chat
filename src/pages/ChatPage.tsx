import { useState, useEffect } from "react";
import ChatInput from "../components/chat/ChatInput";
import ChatMessageList from "../components/chat/ChatMessageList";
import { useSessionStore, useCurrentSession } from "../store/sessionStore";
import type { Message } from "../types/chat";

const ChatPage = () => {
  // 获取当前会话和操作函数
  const currentSession = useCurrentSession();
  // 添加消息到当前会话的函数
  const addMessageToCurrentSession = useSessionStore(
    (state) => state.addMessageToCurrentSession
  );
  // 创建新会话的函数
  const createSession = useSessionStore((state) => state.createSession);
  // 输入框的状态
  const [inputText, setInputText] = useState("");

  // 当组件加载时，如果没有当前会话，则创建一个新的会话
  useEffect(() => {
    if (!currentSession) {
      createSession();
    }
  }, [currentSession, createSession]);
  
  // 处理发送消息的函数
  const handleSend = () => {
    const text = inputText.trim();
    if (!text || !currentSession) return;
    // 模拟用户消息和 AI 回复
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    // 这里可以替换为实际的 AI 回复逻辑，目前是模拟回复
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `这是 AI 的示例回复：已收到你的消息“${text}”。`,
      timestamp: Date.now() + 1,
    };
    
    // 将用户消息和 AI 回复添加到当前会话中
    addMessageToCurrentSession(userMessage);
    // 模拟 AI 回复的延迟
    setTimeout(() => {
      addMessageToCurrentSession(assistantMessage);
    }, 1000);
    // 清空输入框
    setInputText("");
  };

  return (
    // 最外层容器：占满屏幕，垂直布局，背景灰色 
    <div className="h-full flex flex-col bg-gray-50">

      {/* 顶部标题栏：带边框、白色背景、阴影 */}
      <header className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
        <div className="text-lg font-semibold text-gray-900">AI 智能对话</div>
        <div className="mt-1 text-sm text-gray-500">
          当前会话：{currentSession?.title || "未选择会话"}
        </div>
      </header>

      {/* 中间聊天内容区域：自动滚动、内边距 */}
      <main className="flex-1 overflow-y-auto p-6">
        {currentSession ? (
          <ChatMessageList messages={currentSession.messages} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            请选择左侧会话或新建一个对话。
          </div>
        )}
      </main>

      {/* 底部输入框：只有存在当前会话时才渲染 */}
      {currentSession && (
        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSend={handleSend}
        />
      )}
    </div>
  );
};

export default ChatPage;
