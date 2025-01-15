"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFinance, Transaction } from "@/contexts/FinanceContext"
import { useState } from "react"

const RecentTransactionsCard = () => {
  const { transactions, updateTransaction, deleteTransaction, currency } = useFinance()
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction({ ...transaction })
  }

  const handleDelete = (id: string) => {
    deleteTransaction(id)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, editingTransaction)
      setEditingTransaction(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.slice(-5).reverse().map((transaction: Transaction) => (
            <li key={transaction.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{currency} {transaction.amount.toFixed(2)}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Transaction</DialogTitle>
                      <DialogDescription>Make changes to your transaction here.</DialogDescription>
                    </DialogHeader>
                    {editingTransaction && (
                      <form onSubmit={handleSave}>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={editingTransaction.description}
                              onChange={(e) => setEditingTransaction({...editingTransaction, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              id="amount"
                              type="number"
                              value={editingTransaction.amount}
                              onChange={(e) => setEditingTransaction({...editingTransaction, amount: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="type">Type</Label>
                            <select
                              id="type"
                              value={editingTransaction.type}
                              onChange={(e) => setEditingTransaction({...editingTransaction, type: e.target.value as 'income' | 'expense'})}
                              className="w-full p-2 border rounded"
                            >
                              <option value="income">Income</option>
                              <option value="expense">Expense</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                              id="category"
                              value={editingTransaction.category}
                              onChange={(e) => setEditingTransaction({...editingTransaction, category: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={editingTransaction.date}
                              onChange={(e) => setEditingTransaction({...editingTransaction, date: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default RecentTransactionsCard

