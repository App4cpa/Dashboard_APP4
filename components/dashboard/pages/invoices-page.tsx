"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Send, Download } from "lucide-react"

const invoices = [
  {
    id: "INV-2024-001",
    clientName: "ABC Corporation",
    amount: 5000,
    dueDate: "2024-02-15",
    issueDate: "2024-01-15",
    status: "paid",
    description: "Web Development Services",
  },
  {
    id: "INV-2024-002",
    clientName: "XYZ Ltd",
    amount: 7500,
    dueDate: "2024-02-20",
    issueDate: "2024-01-20",
    status: "sent",
    description: "Consulting Services",
  },
  {
    id: "INV-2024-003",
    clientName: "Tech Startup Inc",
    amount: 3200,
    dueDate: "2024-01-30",
    issueDate: "2024-01-01",
    status: "overdue",
    description: "Mobile App Development",
  },
  {
    id: "INV-2024-004",
    clientName: "Marketing Agency",
    amount: 2800,
    dueDate: "2024-02-25",
    issueDate: "2024-01-25",
    status: "draft",
    description: "SEO Optimization",
  },
]

export function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-[#005100]/20 text-[#005100] border-[#005100]/30"
      case "sent":
        return "bg-[#FDC504]/20 text-[#FDC504] border-[#FDC504]/30"
      case "overdue":
        return "bg-[#BB0216]/20 text-[#BB0216] border-[#BB0216]/30"
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return "✅"
      case "sent":
        return "📤"
      case "overdue":
        return "⚠️"
      case "draft":
        return "📝"
      default:
        return "📄"
    }
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400 mt-1">Create, send, and track your invoices</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#005100] hover:bg-[#005100]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
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
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Invoices</p>
              <p className="text-2xl font-bold text-white">{invoices.length}</p>
              <p className="text-[#648e00] text-sm">${totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Paid</p>
              <p className="text-2xl font-bold text-[#005100]">
                {invoices.filter((inv) => inv.status === "paid").length}
              </p>
              <p className="text-[#005100] text-sm">${paidAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-[#FDC504]">
                {invoices.filter((inv) => inv.status === "sent").length}
              </p>
              <p className="text-[#FDC504] text-sm">
                $
                {invoices
                  .filter((inv) => inv.status === "sent")
                  .reduce((sum, inv) => sum + inv.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Overdue</p>
              <p className="text-2xl font-bold text-[#BB0216]">
                {invoices.filter((inv) => inv.status === "overdue").length}
              </p>
              <p className="text-[#BB0216] text-sm">${overdueAmount.toLocaleString()}</p>
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
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg">{invoice.id}</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">{invoice.clientName}</p>
                </div>
                <Badge className={getStatusColor(invoice.status)}>
                  {getStatusIcon(invoice.status)} {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-2xl font-bold text-white">${invoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Description</p>
                  <p className="text-gray-300 text-sm">{invoice.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Issue Date</p>
                    <p className="text-gray-300 text-sm">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Due Date</p>
                    <p className="text-gray-300 text-sm">{invoice.dueDate}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {invoice.status !== "paid" && (
                    <Button size="sm" className="flex-1 bg-[#005100] hover:bg-[#005100]/90 text-white">
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
