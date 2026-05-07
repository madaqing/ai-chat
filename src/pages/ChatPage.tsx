import { useState, useEffect } from "react";
import ChatInput from "../components/chat/ChatInput";
import ChatMessageList from "../components/chat/ChatMessageList";
import { useSessionStore, useCurrentSession } from "../store/sessionStore";
import type { Message } from "../types/chat";

const ChatPage = () => {
  const currentSession = useCurrentSession();
  const addMessageToCurrentSession = useSessionStore(
    (state) => state.addMessageToCurrentSession
  );
  const createSession = useSessionStore((state) => state.createSession);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!currentSession) {
      createSession();
    }
  }, [currentSession, createSession]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || !currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `这是 AI 的示例回复：已收到你的消息“${text}”。`,
      timestamp: Date.now() + 1,
    };

    addMessageToCurrentSession(userMessage);
    addMessageToCurrentSession(assistantMessage);
    setInputText("");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
        <div className="text-lg font-semibold text-gray-900">AI 智能对话</div>
        <div className="mt-1 text-sm text-gray-500">
          当前会话：{currentSession?.title || "未选择会话"}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {currentSession ? (
          <ChatMessageList messages={currentSession.messages} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            请选择左侧会话或新建一个对话。
          </div>
        )}
      </main>

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
