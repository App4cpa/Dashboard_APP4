"use client"

import { SummaryCards } from "@/components/dashboard/summary-cards"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { InvoiceOverview } from "@/components/dashboard/invoice-overview"
import { ExpenseCategories } from "@/components/dashboard/expense-categories"
import { TransactionsPage } from "@/components/dashboard/pages/transactions-page"
import { InvoicesPage } from "@/components/dashboard/pages/invoices-page"
import { ExpensesPage } from "@/components/dashboard/pages/expenses-page"
import { PayrollPage } from "@/components/dashboard/pages/payroll-page"
import { ReportsPage } from "@/components/dashboard/pages/reports-page"
import { SettingsPage } from "@/components/dashboard/pages/settings-page"

interface DashboardContentProps {
  activeView: string
}

export function DashboardContent({ activeView }: DashboardContentProps) {
  switch (activeView) {
    case "transactions":
      return <TransactionsPage />
    case "invoices":
      return <InvoicesPage />
    case "expenses":
      return <ExpensesPage />
    case "payroll":
      return <PayrollPage />
    case "reports":
      return <ReportsPage />
    case "settings":
      return <SettingsPage />
    
    case "dashboard":
    default:
      return (
        <div className="space-y-6">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CashFlowChart />
            <InvoiceOverview />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>
            <div>
              <ExpenseCategories />
            </div>
          </div>
        </div>
      )
  }
}
