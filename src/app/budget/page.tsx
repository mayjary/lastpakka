"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { useFinance } from "@/contexts/FinanceContext"
import { toast } from "react-hot-toast"

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

  useEffect(() => {
    budgets.forEach(budget => {
      if (budget.spent > budget.budgeted) {
        toast.error(`Budget exceeded for ${budget.category}!`, {
          duration: 5000,
          position: 'top-right',
        })
      }
    })
  }, [budgets])

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
        {budgets.map((budget) => {
          const percentSpent = (budget.spent / budget.budgeted) * 100
          const isExceeded = percentSpent > 100
          return (
            <Card key={budget.id} className={isExceeded ? "border-red-500" : ""}>
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                <Progress 
                  value={Math.min(percentSpent, 100)} 
                  className={`${
                    isExceeded ? "bg-red-200" : ""
                  } relative w-full h-4 rounded overflow-hidden`}
                >
                  <div
                    className={`h-full transition-all duration-200 ${
                      isExceeded ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(percentSpent, 100)}%` }}
                  ></div>
                </Progress>
                  <div className="flex justify-between text-sm">
                    <span className={isExceeded ? "text-red-500 font-bold" : ""}>
                      Spent: {currency} {budget.spent.toFixed(2)}
                    </span>
                    <span>Budgeted: {currency} {budget.budgeted.toFixed(2)}</span>
                  </div>
                  {isExceeded && (
                    <p className="text-red-500 text-sm">
                      Budget exceeded by {currency} {(budget.spent - budget.budgeted).toFixed(2)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

