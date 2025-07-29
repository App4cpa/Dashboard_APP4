"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Search, Plus, Download } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    date: "2024-01-25",
    description: "Stripe Payment - Client ABC",
    category: "Income",
    amount: 5000,
    status: "completed",
    type: "income",
    reference: "INV-2024-001",
  },
  {
    id: "TXN-002",
    date: "2024-01-24",
    description: "Google Ads Campaign",
    category: "Marketing",
    amount: -850,
    status: "completed",
    type: "expense",
    reference: "EXP-2024-045",
  },
  {
    id: "TXN-003",
    date: "2024-01-23",
    description: "Monthly Payroll",
    category: "Salaries",
    amount: -12000,
    status: "pending",
    type: "expense",
    reference: "PAY-2024-001",
  },
  {
    id: "TXN-004",
    date: "2024-01-22",
    description: "Software Subscription - Accounting Tools",
    category: "Tools",
    amount: -299,
    status: "completed",
    type: "expense",
    reference: "EXP-2024-044",
  },
  {
    id: "TXN-005",
    date: "2024-01-21",
    description: "Client Payment - Project XYZ",
    category: "Income",
    amount: 7500,
    status: "completed",
    type: "income",
    reference: "INV-2024-002",
  },
]

export function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 mt-1">Manage and track all your financial transactions</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Income</p>
                <p className="text-2xl font-bold text-[#005100]">${totalIncome.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-[#005100]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-[#BB0216]">${totalExpenses.toLocaleString()}</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-[#BB0216]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Net Flow</p>
                <p className="text-2xl font-bold text-white">${(totalIncome - totalExpenses).toLocaleString()}</p>
              </div>
              <div className="text-[#648e00]">{totalIncome - totalExpenses > 0 ? "+" : "-"}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      transaction.type === "income"
                        ? "bg-[#005100]/20 text-[#005100]"
                        : "bg-[#BB0216]/20 text-[#BB0216]"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{transaction.reference}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{transaction.category}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-bold text-lg ${transaction.amount > 0 ? "text-[#005100]" : "text-white"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
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
    </div>
  )
}
