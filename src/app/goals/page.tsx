import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
  { name: "Emergency Fund", target: 10000, current: 5000 },
  { name: "Vacation", target: 5000, current: 2000 },
  { name: "New Car", target: 20000, current: 8000 },
]

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.name}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={(goal.current / goal.target) * 100} />
                <div className="flex justify-between text-sm">
                  <span>Current: ${goal.current}</span>
                  <span>Target: ${goal.target}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

