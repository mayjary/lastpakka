import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const budgets = [
  { category: "Housing", budgeted: 1000, spent: 950 },
  { category: "Food", budgeted: 500, spent: 450 },
  { category: "Transportation", budgeted: 300, spent: 280 },
  { category: "Entertainment", budgeted: 200, spent: 150 },
]

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Monthly Budget</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => (
          <Card key={budget.category}>
            <CardHeader>
              <CardTitle>{budget.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(budget.spent / budget.budgeted) * 100} />
                <div className="flex justify-between text-sm">
                  <span>Spent: ${budget.spent}</span>
                  <span>Budgeted: ${budget.budgeted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

