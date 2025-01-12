import BalanceCard from '@/components/dashboard/balance-card'
import IncomeExpenseCard from '@/components/dashboard/income-expense-card'
import SpendingReportCard from '@/components/dashboard/spending-report-card'
import RecentTransactionsCard from '@/components/dashboard/recent-transactions-card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard />
        <IncomeExpenseCard />
      </div>
      <SpendingReportCard />
      <RecentTransactionsCard />
    </div>
  )
}

