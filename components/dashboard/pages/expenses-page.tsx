"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Receipt, Plus, Search, Upload } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const expenses = [
  {
    id: "EXP-001",
    date: "2024-01-25",
    description: "Office Rent",
    category: "Office",
    amount: 2500,
    status: "approved",
    receipt: true,
  },
  {
    id: "EXP-002",
    date: "2024-01-24",
    description: "Google Ads Campaign",
    category: "Marketing",
    amount: 850,
    status: "pending",
    receipt: true,
  },
  {
    id: "EXP-003",
    date: "2024-01-23",
    description: "Software Licenses",
    category: "Tools",
    amount: 299,
    status: "approved",
    receipt: false,
  },
  {
    id: "EXP-004",
    date: "2024-01-22",
    description: "Business Lunch",
    category: "Meals",
    amount: 125,
    status: "rejected",
    receipt: true,
  },
  {
    id: "EXP-005",
    date: "2024-01-21",
    description: "Travel Expenses",
    category: "Travel",
    amount: 450,
    status: "approved",
    receipt: true,
  },
]

const categoryData = [
  { name: "Office", value: 2500, color: "#BB0216" },
  { name: "Marketing", value: 850, color: "#005100" },
  { name: "Tools", value: 299, color: "#E68B37" },
  { name: "Travel", value: 450, color: "#FDC504" },
  { name: "Meals", value: 125, color: "#648e00" },
]

const monthlyData = [
  { month: "Oct", amount: 3200 },
  { month: "Nov", amount: 2800 },
  { month: "Dec", amount: 3500 },
  { month: "Jan", amount: 4224 },
]

export function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory
    const matchesStatus = filterStatus === "all" || expense.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#005100]/20 text-[#005100] border-[#005100]/30"
      case "pending":
        return "bg-[#FDC504]/20 text-[#FDC504] border-[#FDC504]/30"
      case "rejected":
        return "bg-[#BB0216]/20 text-[#BB0216] border-[#BB0216]/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const approvedExpenses = expenses.filter((exp) => exp.status === "approved").reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter((exp) => exp.status === "pending").reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Expenses</h1>
          <p className="text-gray-400 mt-1">Track and manage your business expenses</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Upload Receipt
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-2xl font-bold text-[#005100]">${approvedExpenses.toLocaleString()}</p>
              <p className="text-[#005100] text-xs mt-1">
                {expenses.filter((exp) => exp.status === "approved").length} expenses
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#FDC504]">${pendingExpenses.toLocaleString()}</p>
              <p className="text-[#FDC504] text-xs mt-1">
                {expenses.filter((exp) => exp.status === "pending").length} expenses
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Avg per Day</p>
              <p className="text-2xl font-bold text-white">${Math.round(totalExpenses / 31).toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">January 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {categoryData.map((entry, index) => (
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
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="amount" fill="#BB0216" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Meals">Meals</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#BB0216]/20 p-3 rounded-lg">
                    <Receipt className="h-5 w-5 text-[#BB0216]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{expense.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm">{expense.date}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{expense.category}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{expense.id}</p>
                      {expense.receipt && (
                        <>
                          <span className="text-gray-500">•</span>
                          <Badge variant="outline" className="text-xs border-[#005100]/30 text-[#005100]">
                            Receipt
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-lg text-white">${expense.amount.toLocaleString()}</p>
                  </div>
                  <Badge className={getStatusColor(expense.status)}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
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
