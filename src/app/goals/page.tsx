"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { useFinance } from "@/contexts/FinanceContext"

export default function GoalsPage() {
  const { goals, addGoal, currency } = useFinance()
  const [newGoal, setNewGoal] = useState("")
  const [newTarget, setNewTarget] = useState("")

  const handleAddGoal = () => {
    if (newGoal && newTarget) {
      addGoal({
        name: newGoal,
        target: parseFloat(newTarget),
      })
      setNewGoal("")
      setNewTarget("")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Goals</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Goal Name</Label>
            <Input
              id="goal"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter goal name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Target Amount</Label>
            <Input
              id="target"
              type="number"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="Enter target amount"
            />
          </div>
          <Button onClick={handleAddGoal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(goal.current / goal.target) * 100} />
                <div className="flex justify-between text-sm">
                  <span>Current: {currency} {goal.current.toFixed(2)}</span>
                  <span>Target: {currency} {goal.target.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

