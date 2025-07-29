"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const expenseData = [
  { name: "Marketing", value: 30, amount: 8250, color: "#BB0216" },
  { name: "Payroll", value: 40, amount: 11000, color: "#005100" },
  { name: "Tools", value: 15, amount: 4125, color: "#E68B37" },
  { name: "Misc", value: 15, amount: 4125, color: "#FDC504" },
]

export function ExpenseCategories() {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Expense Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value}% ($${props.payload.amount.toLocaleString()})`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-3 mt-4">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{item.value}%</p>
                <p className="text-gray-400 text-xs">${item.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
