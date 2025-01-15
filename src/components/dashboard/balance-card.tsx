"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinance } from "@/contexts/FinanceContext"

const BalanceCard = () => {
  const { balance, currency } = useFinance()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{currency} {balance.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

export default BalanceCard

