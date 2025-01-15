"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinance } from "@/contexts/FinanceContext"

const IncomeExpenseCard = () => {
  const { income, expense, currency } = useFinance()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income / Expense</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Income</p>
          <p className="text-2xl font-bold text-green-600">{currency} {income.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expense</p>
          <p className="text-2xl font-bold text-red-600">{currency} {expense.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default IncomeExpenseCard

