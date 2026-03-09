"use client";

import { useState, useRef, useEffect } from "react";
import { OrangeBtn } from "@/components/ui/OrangeBtn";
import { MAX_MESSAGE_LENGTH } from "@/lib/constants/tutor";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
  initialConversationId?: string;
}

export function ChatInterface({
  initialMessages = [],
  initialConversationId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(
    initialConversationId
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setSending(true);

    try {
      const res = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, conversationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setSending(false);
        return;
      }

      setConversationId(data.conversationId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function handleNewConversation() {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
    setInput("");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">{"\u{1F916}"}</div>
              <h2 className="text-xl font-bold mb-2">
                Hey! I&apos;m Byte, your AI tutor.
              </h2>
              <p className="text-slate-400 text-sm max-w-md">
                Ask me anything about AI, machine learning, or Python
                programming. I&apos;ll guide you to the answer!
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-nd-orange/20 text-white border border-nd-orange/30"
                  : "bg-nd-card text-slate-200 border border-nd-border"
              }`}
            >
              {msg.role === "assistant" && (
                <span className="text-xs font-mono text-nd-cyan block mb-1">
                  Byte
                </span>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-nd-card text-slate-200 border border-nd-border px-4 py-3 rounded-2xl text-sm">
              <span className="text-xs font-mono text-nd-cyan block mb-1">
                Byte
              </span>
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-nd-red/10 border border-nd-red/30 rounded-2xl px-4 py-3 text-sm text-nd-red">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-nd-border pt-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={handleNewConversation}
            className="text-xs text-slate-500 hover:text-white transition-colors"
          >
            + New conversation
          </button>
          {conversationId && (
            <span className="text-xs text-slate-600 font-mono">
              {messages.filter((m) => m.role === "user").length}/20 messages
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask Byte a question about AI..."
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={sending}
            className="flex-1 px-4 py-3 rounded-xl bg-nd-surface border border-nd-border text-white text-sm focus:outline-none focus:border-nd-orange/50 focus:ring-1 focus:ring-nd-orange/30 disabled:opacity-50"
          />
          <OrangeBtn
            onClick={handleSend}
            disabled={sending || !input.trim()}
            size="md"
          >
            Send
          </OrangeBtn>
        </div>
      </div>
    </div>
  );
}
