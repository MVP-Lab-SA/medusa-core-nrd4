import { useState, useEffect, useRef } from "react"
import { clx } from "@medusajs/ui"
import { ChatBubble, XMark, PaperPlane } from "@medusajs/icons"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
}

interface ChatWidgetProps {
  onSendMessage?: (message: string) => void
  welcomeMessage?: string
  placeholder?: string
  agentName?: string
  agentAvatar?: string
  position?: "bottom-right" | "bottom-left"
  className?: string
}

export function ChatWidget({
  onSendMessage,
  welcomeMessage = "Hi! How can we help you today?",
  placeholder = "Type a message...",
  agentName = "Support",
  agentAvatar,
  position = "bottom-right",
  className,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0 && welcomeMessage) {
      setMessages([
        {
          id: "welcome",
          content: welcomeMessage,
          sender: "agent",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, welcomeMessage, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    onSendMessage?.(inputValue.trim())
    setInputValue("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Thanks for your message! Our team will get back to you shortly.",
          sender: "agent",
          timestamp: new Date(),
        },
      ])
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  return (
    <div className={clx("fixed z-50", positionClasses[position], className)}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-cyan-500">
            <div className="flex items-center gap-3">
              {agentAvatar ? (
                <img
                  src={agentAvatar}
                  alt={agentName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                  <ChatBubble className="w-4 h-4 text-black" />
                </div>
              )}
              <div>
                <p className="text-black font-semibold text-sm">{agentName}</p>
                <p className="text-black/70 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-black/10 rounded-lg transition-colors"
            >
              <XMark className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={clx(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={clx(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    message.sender === "user"
                      ? "bg-cyan-500 text-black rounded-br-sm"
                      : "bg-neutral-800 text-white rounded-bl-sm"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={clx(
                      "text-[10px] mt-1",
                      message.sender === "user" ? "text-black/60" : "text-neutral-500"
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={placeholder}
                className="flex-1 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-full text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperPlane className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clx(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all",
          isOpen
            ? "bg-neutral-800 hover:bg-neutral-700"
            : "bg-cyan-500 hover:bg-cyan-400 hover:scale-105"
        )}
      >
        {isOpen ? (
          <XMark className="w-6 h-6 text-white" />
        ) : (
          <ChatBubble className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  )
}
