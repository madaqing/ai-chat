// 底部输入框
import type { KeyboardEvent } from "react";

interface Props {
  inputText: string;
  setInputText: (val: string) => void;
  onSend: () => void;
}

const ChatInput = ({ inputText, setInputText, onSend }: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息，回车发送"
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default ChatInput;