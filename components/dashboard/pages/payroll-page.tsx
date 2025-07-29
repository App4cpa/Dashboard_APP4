"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Search, Download, Calendar, DollarSign } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const employees = [
  {
    id: "EMP-001",
    name: "John Smith",
    position: "Senior Developer",
    department: "Engineering",
    salary: 8500,
    status: "active",
    lastPayment: "2024-01-31",
    ytdEarnings: 8500,
  },
  {
    id: "EMP-002",
    name: "Sarah Johnson",
    position: "Marketing Manager",
    department: "Marketing",
    salary: 6500,
    status: "active",
    lastPayment: "2024-01-31",
    ytdEarnings: 6500,
  },
  {
    id: "EMP-003",
    name: "Mike Davis",
    position: "Accountant",
    department: "Finance",
    salary: 5500,
    status: "active",
    lastPayment: "2024-01-31",
    ytdEarnings: 5500,
  },
  {
    id: "EMP-004",
    name: "Lisa Wilson",
    position: "HR Specialist",
    department: "Human Resources",
    salary: 5000,
    status: "active",
    lastPayment: "2024-01-31",
    ytdEarnings: 5000,
  },
  {
    id: "EMP-005",
    name: "David Brown",
    position: "Sales Representative",
    department: "Sales",
    salary: 4500,
    status: "inactive",
    lastPayment: "2023-12-31",
    ytdEarnings: 0,
  },
]

const payrollHistory = [
  { month: "Oct", amount: 28500 },
  { month: "Nov", amount: 30000 },
  { month: "Dec", amount: 32000 },
  { month: "Jan", amount: 30000 },
]

const departmentData = [
  { department: "Engineering", employees: 1, cost: 8500 },
  { department: "Marketing", employees: 1, cost: 6500 },
  { department: "Finance", employees: 1, cost: 5500 },
  { department: "HR", employees: 1, cost: 5000 },
  { department: "Sales", employees: 1, cost: 4500 },
]

export function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const totalPayroll = employees.filter((emp) => emp.status === "active").reduce((sum, emp) => sum + emp.salary, 0)
  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const avgSalary = totalPayroll / activeEmployees

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Payroll</h1>
          <p className="text-gray-400 mt-1">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
          <Button className="bg-[#BB0216] hover:bg-[#BB0216]/90 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Payroll</p>
                <p className="text-2xl font-bold text-white">${totalPayroll.toLocaleString()}</p>
                <p className="text-gray-400 text-xs mt-1">Monthly</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#005100]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Employees</p>
                <p className="text-2xl font-bold text-white">{activeEmployees}</p>
                <p className="text-[#005100] text-xs mt-1">+2 this month</p>
              </div>
              <Users className="h-8 w-8 text-[#648e00]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Average Salary</p>
              <p className="text-2xl font-bold text-white">${Math.round(avgSalary).toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">Per employee</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Next Payroll</p>
              <p className="text-2xl font-bold text-[#FDC504]">Feb 29</p>
              <p className="text-gray-400 text-xs mt-1">2024</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Payroll History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={payrollHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#005100"
                  strokeWidth={3}
                  dot={{ fill: "#005100", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Department Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="department" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="cost" fill="#BB0216" radius={[4, 4, 0, 0]} />
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#005100]/20 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-[#005100]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{employee.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm">{employee.position}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{employee.department}</p>
                      <span className="text-gray-500">•</span>
                      <p className="text-gray-400 text-sm">{employee.id}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-lg text-white">${employee.salary.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">YTD: ${employee.ytdEarnings.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">Last: {employee.lastPayment}</p>
                  </div>
                  <Badge
                    className={
                      employee.status === "active"
                        ? "bg-[#005100]/20 text-[#005100] border-[#005100]/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }
                  >
                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
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
