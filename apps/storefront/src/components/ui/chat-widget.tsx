import * as React from "react"
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react"
import { clx } from "@medusajs/ui"

interface Message {
  id: string
  content: string
  sender: "user" | "agent" | "bot"
  timestamp: Date
}

interface ChatWidgetProps {
  onSendMessage?: (message: string) => Promise<string | void>
  welcomeMessage?: string
  placeholder?: string
  agentName?: string
  agentAvatar?: string
  position?: "bottom-right" | "bottom-left"
  className?: string
}

export function ChatWidget({
  onSendMessage,
  welcomeMessage = "Hi there! How can we help you today?",
  placeholder = "Type your message...",
  agentName = "Support",
  agentAvatar,
  position = "bottom-right",
  className
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await onSendMessage?.(input.trim())
      if (response) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "bot",
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  }

  return (
    <div className={clx("fixed z-50", positionClasses[position], className)}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={clx(
            "mb-4 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl",
            "bg-zinc-900 border border-zinc-700",
            isMinimized ? "h-14" : "h-[500px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500 to-cyan-600">
            <div className="flex items-center gap-3">
              {agentAvatar ? (
                <img
                  src={agentAvatar}
                  alt={agentName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{agentName}</p>
                <p className="text-white/70 text-xs">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 h-[360px] overflow-y-auto p-4 space-y-4">
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
                          : "bg-zinc-800 text-white rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={clx(
                          "text-xs mt-1",
                          message.sender === "user"
                            ? "text-black/60"
                            : "text-zinc-500"
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 text-white rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.1s]" />
                        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-zinc-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={clx(
                      "p-2 rounded-full transition-colors",
                      input.trim() && !isLoading
                        ? "bg-cyan-500 text-black hover:bg-cyan-400"
                        : "bg-zinc-800 text-zinc-500"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clx(
          "p-4 rounded-full shadow-lg transition-all",
          "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
          "hover:scale-110 hover:shadow-cyan-500/25",
          isOpen && "rotate-90"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}
