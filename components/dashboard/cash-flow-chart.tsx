"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const cashFlowData = [
  { month: "Jan", income: 45000, expense: 32000 },
  { month: "Feb", income: 52000, expense: 28000 },
  { month: "Mar", income: 48000, expense: 35000 },
  { month: "Apr", income: 61000, expense: 42000 },
  { month: "May", income: 55000, expense: 38000 },
  { month: "Jun", income: 67000, expense: 45000 },
]

export function CashFlowChart() {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Cash Flow</CardTitle>
        <Select defaultValue="6months">
          <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-white/20">
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="1year">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#005100"
              strokeWidth={3}
              name="Income"
              dot={{ fill: "#005100", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#BB0216"
              strokeWidth={3}
              name="Expense"
              dot={{ fill: "#BB0216", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
