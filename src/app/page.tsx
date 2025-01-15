"use client"

import { useEffect, useState } from "react"
import BalanceCard from "@/components/dashboard/balance-card"
import IncomeExpenseCard from "@/components/dashboard/income-expense-card"
import SpendingReportCard from "@/components/dashboard/spending-report-card"
import RecentTransactionsCard from "@/components/dashboard/recent-transactions-card"
import { getLoggedInUser } from "@/lib/actions/user.actions"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser() 
      setUser(loggedInUser) 
    }
    fetchUser() 
  }, [])

  if (!user) {
    return <div>Loading...</div> 
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard />
        <IncomeExpenseCard/>
      </div>
      <SpendingReportCard />
      <RecentTransactionsCard/>
    </div>
  )
}
