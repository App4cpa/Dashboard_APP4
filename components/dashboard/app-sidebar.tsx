"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  Receipt,
  Users,
  BarChart3,
  Bot,
  Settings,
  LogOut,
  FileSpreadsheet,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", title: "Transactions", icon: ArrowLeftRight },
  { id: "invoices", title: "Invoices", icon: FileText },
  { id: "expenses", title: "Expenses", icon: Receipt },
  { id: "payroll", title: "Payroll", icon: Users },
  { id: "reports", title: "Reports", icon: BarChart3 },
  { id: "settings", title: "Settings", icon: Settings },
]

interface AppSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function AppSidebar({ activeView, onViewChange, onLogout }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-700">
      <div className="bg-gray-900 h-full">
        <SidebarHeader className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2">
              <img
                src="/logomain.png"
                alt="Icon"
                className="h-12 w-12"
              />
            </div>


            <div>
              <h2 className="text-white font-bold text-lg">App4CPA</h2>
              <p className="text-gray-400 text-sm">AI Accounting</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-6">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => onViewChange(item.id)}
                  isActive={activeView === item.id}
                  className={`w-full justify-start py-3 px-4 rounded-lg transition-all duration-200 ${activeView === item.id
                    ? "bg-[#BB0216] text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-gray-700">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}
