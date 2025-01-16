"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface IncomeExpense {
  income: number;
  expense: number;
}

const IncomeExpenseCard = () => {
  const [data, setData] = useState<IncomeExpense>({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(false);

  const fetchIncomeExpense = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/income-expense');
      if (!response.ok) {
        throw new Error('Failed to fetch income/expense data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching income/expense data:", error);
      toast.error("Failed to load income/expense data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeExpense();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income / Expense</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-2xl font-bold text-green-600">${data.income.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expense</p>
              <p className="text-2xl font-bold text-red-600">${data.expense.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseCard;

