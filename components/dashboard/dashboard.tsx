
"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardContent } from "@/components/dashboard/dashboard-content"


interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [isAIOpen, setIsAIOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen">
          <AppSidebar activeView={activeView} onViewChange={setActiveView} onLogout={onLogout} />

          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onOpenAI={() => setIsAIOpen(true)} />
            <main className="flex-1 overflow-auto p-6">
              <DashboardContent activeView={activeView} />
            </main>
          </div>

        
        </div>
      </SidebarProvider>
    </div>
  )
}
