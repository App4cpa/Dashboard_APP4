"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Filter } from "lucide-react"

const transactions = [
  {
    id: 1,
    date: "23 Jul 25",
    description: "Stripe Payout",
    category: "Income",
    amount: 2000,
    status: "completed",
    type: "income",
  },
  {
    id: 2,
    date: "22 Jul 25",
    description: "Google Ads",
    category: "Marketing",
    amount: -300,
    status: "completed",
    type: "expense",
  },
  {
    id: 3,
    date: "21 Jul 25",
    description: "Payroll",
    category: "Salaries",
    amount: -5000,
    status: "pending",
    type: "expense",
  },
  {
    id: 4,
    date: "20 Jul 25",
    description: "Client Payment",
    category: "Income",
    amount: 3500,
    status: "completed",
    type: "income",
  },
  {
    id: 5,
    date: "19 Jul 25",
    description: "Office Supplies",
    category: "Operations",
    amount: -150,
    status: "completed",
    type: "expense",
  },
]

export function RecentTransactions() {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Recent Transactions</CardTitle>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white bg-transparent">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === "income" ? "bg-[#005100]/20 text-[#005100]" : "bg-[#BB0216]/20 text-[#BB0216]"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                    <span className="text-gray-500">•</span>
                    <p className="text-gray-400 text-sm">{transaction.category}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-semibold ${transaction.amount > 0 ? "text-[#005100]" : "text-white"}`}>
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <Badge
                  variant={transaction.status === "completed" ? "default" : "secondary"}
                  className={
                    transaction.status === "completed"
                      ? "bg-[#005100]/20 text-[#005100] border-[#005100]/30"
                      : "bg-[#FDC504]/20 text-[#FDC504] border-[#FDC504]/30"
                  }
                >
                  {transaction.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
