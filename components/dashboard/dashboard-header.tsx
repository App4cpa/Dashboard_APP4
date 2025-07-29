"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, User, Bot, Sparkles } from "lucide-react"

interface DashboardHeaderProps {
  onOpenAI: () => void
}

export function DashboardHeader({ onOpenAI }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const notifications = [
    { id: 1, message: "New invoice payment received", time: "2 min ago", unread: true },
    { id: 2, message: "Monthly report is ready", time: "1 hour ago", unread: true },
    { id: 3, message: "Expense approval needed", time: "3 hours ago", unread: false },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="bg-white/5 backdrop-blur-lg border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-white text-xl font-semibold">Good Morning, John 👋</h1>
            <p className="text-gray-400 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions, invoices... (Press / to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === "/") {
                  e.preventDefault()
                  e.currentTarget.focus()
                }
              }}
            />
          </div>

          

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#BB0216] text-xs p-0 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-800/95 backdrop-blur-lg border-white/20">
              <div className="p-3 border-b border-white/10">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3 text-gray-300 hover:text-white">
                  <div className="flex items-start gap-3">
                    {notification.unread && <div className="w-2 h-2 bg-[#BB0216] rounded-full mt-2 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <div className="w-8 h-8 bg-[#BB0216] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">John Cena</p>
                  <p className="text-xs text-gray-400">John@company.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800/95 backdrop-blur-lg border-white/20">
              <DropdownMenuItem className="text-gray-300 hover:text-white">Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white">Account Preferences</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white">Quick Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
