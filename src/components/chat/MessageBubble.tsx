import type { Message } from "../../types/chat";

interface Props {
  msg: Message;
}

const MessageBubble = ({ msg }: Props) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        <div className="text-sm leading-6 whitespace-pre-wrap">{msg.content}</div>
        <div className="mt-3 text-right text-xs text-gray-400">
          {isUser ? "用户" : "AI 助手"}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

