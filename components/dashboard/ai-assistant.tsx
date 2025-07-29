"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  X, Send, Bot, User,
  TrendingDown, FileText, Mail, Receipt, BarChart3, Brain, Loader2
} from "lucide-react"
import { useChat } from "ai/react"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

const quickActions = [
  {
    icon: TrendingDown,
    label: "Predict cash shortages",
    prompt:
      "Analyze my current cash flow data and predict potential cash shortages in the next 3 months. Consider my revenue trends, expense patterns, and seasonal variations.",
  },
  {
    icon: Brain,
    label: "Cost-cutting strategies",
    prompt:
      "Based on my expense data, suggest specific cost-cutting strategies that could reduce my monthly expenses by 10-15% without affecting business operations.",
  },
  {
    icon: BarChart3,
    label: "Generate monthly report",
    prompt:
      "Create a comprehensive monthly financial report summary including revenue analysis, expense breakdown, profit margins, and key performance indicators.",
  },
  {
    icon: Receipt,
    label: "Expense optimization",
    prompt:
      "Review my expense categories and suggest ways to optimize spending. Identify any unusual patterns or opportunities for better vendor negotiations.",
  },
  {
    icon: Mail,
    label: "Draft overdue reminders",
    prompt:
      "Help me draft professional email templates for overdue invoice reminders. Include escalation levels for 30, 60, and 90+ days overdue.",
  },
  {
    icon: FileText,
    label: "Tax preparation advice",
    prompt:
      "Provide guidance on tax preparation based on my current financial data. What deductions should I consider and what documents do I need to prepare?",
  },
]

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Hello! I'm your AI accounting assistant. I can help you analyze your finances, predict trends, generate reports, draft communications, and provide strategic business insights. How can I assist you today?",
      },
    ],
  })

  const handleQuickAction = (prompt: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { elements: { message: { value: prompt } } },
    } as any

    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => handleSubmit(syntheticEvent), 100)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[700px] bg-white/10 backdrop-blur-lg border-white/20 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#005100] p-2 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">AI Accounting Assistant</CardTitle>
              <p className="text-gray-400 text-sm">Powered by advanced AI for financial insights</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b border-white/10">
            <p className="text-gray-300 text-sm mb-3 font-medium">Quick Actions:</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.prompt)}
                  disabled={isLoading}
                  className="justify-start text-gray-300 border-white/20 hover:text-white hover:bg-white/10 h-auto py-2 px-3"
                >
                  <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="bg-[#005100] p-2 rounded-lg flex-shrink-0 self-start">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-[#BB0216] text-white ml-auto"
                        : "bg-white/10 text-gray-100 border border-white/20"
                    }`}
                  >
                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-2">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="bg-[#BB0216] p-2 rounded-lg flex-shrink-0 self-start">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-[#005100] p-2 rounded-lg flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/10 text-gray-100 p-4 rounded-lg border border-white/20">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Analyzing your request...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about your finances, accounting, or business strategy..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#005100] hover:bg-[#005100]/90 text-white px-6"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              💡 Tip: Be specific about your financial data or business context for more accurate insights
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
