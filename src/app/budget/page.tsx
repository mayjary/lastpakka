"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { useFinance } from "@/contexts/FinanceContext"

export default function BudgetPage() {
  const { budgets, addBudget, currency } = useFinance()
  const [newCategory, setNewCategory] = useState("")
  const [newAmount, setNewAmount] = useState("")

  const handleAddBudget = () => {
    if (newCategory && newAmount) {
      addBudget({
        category: newCategory,
        budgeted: parseFloat(newAmount),
      })
      setNewCategory("")
      setNewAmount("")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Monthly Budget</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Budget Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter budget category"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Budgeted Amount</Label>
            <Input
              id="amount"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Enter budgeted amount"
            />
          </div>
          <Button onClick={handleAddBudget}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Budget
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => (
          <Card key={budget.id}>
            <CardHeader>
              <CardTitle>{budget.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(budget.spent / budget.budgeted) * 100} />
                <div className="flex justify-between text-sm">
                  <span>Spent: {currency} {budget.spent.toFixed(2)}</span>
                  <span>Budgeted: {currency} {budget.budgeted.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

