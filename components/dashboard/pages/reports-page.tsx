"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, FileText, TrendingUp, Eye } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const revenueData = [
  { month: "Jul", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Aug", revenue: 52000, expenses: 28000, profit: 24000 },
  { month: "Sep", revenue: 48000, expenses: 35000, profit: 13000 },
  { month: "Oct", revenue: 61000, expenses: 42000, profit: 19000 },
  { month: "Nov", revenue: 55000, expenses: 38000, profit: 17000 },
  { month: "Dec", revenue: 67000, expenses: 45000, profit: 22000 },
  { month: "Jan", revenue: 52000, expenses: 27500, profit: 24500 },
]

const expenseBreakdown = [
  { category: "Payroll", amount: 30000, color: "#BB0216" },
  { category: "Marketing", amount: 8500, color: "#005100" },
  { category: "Office", amount: 6000, color: "#E68B37" },
  { category: "Tools", amount: 3500, color: "#FDC504" },
  { category: "Travel", amount: 2000, color: "#648e00" },
]

const reports = [
  {
    id: "RPT-001",
    name: "Monthly Financial Summary",
    type: "Financial",
    period: "January 2024",
    generated: "2024-02-01",
    status: "ready",
  },
  {
    id: "RPT-002",
    name: "Tax Preparation Report",
    type: "Tax",
    period: "Q4 2023",
    generated: "2024-01-15",
    status: "ready",
  },
  {
    id: "RPT-003",
    name: "Expense Analysis",
    type: "Expense",
    period: "December 2023",
    generated: "2024-01-05",
    status: "ready",
  },
  {
    id: "RPT-004",
    name: "Payroll Summary",
    type: "Payroll",
    period: "January 2024",
    generated: "2024-02-01",
    status: "generating",
  },
]

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7months")
  const [selectedReport, setSelectedReport] = useState("financial")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400 mt-1">Generate and view comprehensive financial reports</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="financial">
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20">
              <SelectItem value="financial">Financial Report</SelectItem>
              <SelectItem value="tax">Tax Report</SelectItem>
              <SelectItem value="expense">Expense Report</SelectItem>
              <SelectItem value="payroll">Payroll Report</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-[#005100]">$380,000</p>
                <p className="text-[#005100] text-xs mt-1">+18.5% YoY</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#005100]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-[#BB0216]">$247,500</p>
              <p className="text-[#BB0216] text-xs mt-1">+12.3% YoY</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Net Profit</p>
              <p className="text-2xl font-bold text-white">$132,500</p>
              <p className="text-[#648e00] text-xs mt-1">+28.7% YoY</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Profit Margin</p>
              <p className="text-2xl font-bold text-[#FDC504]">34.9%</p>
              <p className="text-[#FDC504] text-xs mt-1">+3.2% YoY</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Revenue & Profit Trend</CardTitle>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="7months">7 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                  dataKey="revenue"
                  stroke="#005100"
                  strokeWidth={3}
                  name="Revenue"
                  dot={{ fill: "#005100", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#BB0216"
                  strokeWidth={3}
                  name="Expenses"
                  dot={{ fill: "#BB0216", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#FDC504"
                  strokeWidth={3}
                  name="Profit"
                  dot={{ fill: "#FDC504", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                >
                  {expenseBreakdown.map((entry, index) => (
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
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Generated Reports */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#005100]/20 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-[#005100]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{report.name}</p>
                      <p className="text-gray-400 text-sm">
                        {report.type} • {report.period}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      report.status === "ready"
                        ? "bg-[#005100]/20 text-[#005100] border-[#005100]/30"
                        : "bg-[#FDC504]/20 text-[#FDC504] border-[#FDC504]/30"
                    }
                  >
                    {report.status === "ready" ? "✅ Ready" : "⏳ Generating"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">Generated: {report.generated}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {report.status === "ready" && (
                      <Button size="sm" className="bg-[#005100] hover:bg-[#005100]/90 text-white">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
