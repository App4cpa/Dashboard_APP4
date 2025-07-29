"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Plus } from "lucide-react"

const invoiceData = [
  { status: "Paid", count: 45, amount: 125000 },
  { status: "Unpaid", count: 12, amount: 32000 },
  { status: "Overdue", count: 5, amount: 8500 },
]

export function InvoiceOverview() {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Invoice Overview</CardTitle>
        <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={invoiceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="status" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value: number, name: string) => [
                name === "amount" ? `$${value.toLocaleString()}` : value,
                name === "amount" ? "Amount" : "Count",
              ]}
            />
            <Bar dataKey="amount" fill="#005100" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {invoiceData.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-white">{item.count}</p>
              <p className="text-gray-400 text-sm">{item.status}</p>
              <p className="text-[#005100] text-sm font-medium">${item.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
