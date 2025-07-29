"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, FileText } from "lucide-react"

const summaryData = [
  {
    title: "Total Revenue",
    value: "$52,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-[#005100]",
    bgColor: "bg-[#005100]/20",
    borderColor: "border-[#005100]/30",
  },
  {
    title: "Total Expenses",
    value: "$27,500",
    change: "+8.2%",
    icon: TrendingDown,
    color: "text-[#BB0216]",
    bgColor: "bg-[#BB0216]/20",
    borderColor: "border-[#BB0216]/30",
  },
  {
    title: "Profit/Loss",
    value: "$24,500",
    change: "+15.3%",
    icon: TrendingUp,
    color: "text-[#648e00]",
    bgColor: "bg-[#648e00]/20",
    borderColor: "border-[#648e00]/30",
  },
  {
    title: "Outstanding Invoices",
    value: "12",
    change: "-3 from last month",
    icon: FileText,
    color: "text-[#FDC504]",
    bgColor: "bg-[#FDC504]/20",
    borderColor: "border-[#FDC504]/30",
  },
]

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <Card
          key={index}
          className={`bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all duration-300 ${item.borderColor} border-l-4`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{item.title}</p>
                <p className="text-white text-2xl font-bold mt-2">{item.value}</p>
                <p className={`text-sm mt-1 ${item.color}`}>{item.change}</p>
              </div>
              <div className={`${item.bgColor} p-3 rounded-lg`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
