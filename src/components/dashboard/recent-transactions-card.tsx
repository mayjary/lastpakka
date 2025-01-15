"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Transaction } from "@/types/transaction";

const TransactionForm = ({
  transaction,
  onSave,
  onClose,
}: {
  transaction: Transaction;
  onSave: (transaction: Transaction) => void;
  onClose: () => void;
}) => {
  const [formTransaction, setFormTransaction] = useState<Transaction>(transaction);

  const handleInputChange = (field: keyof Transaction, value: any) => {
    setFormTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formTransaction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formTransaction.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formTransaction.amount}
            onChange={(e) => handleInputChange("amount", parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={formTransaction.type}
            onChange={(e) => handleInputChange("type", e.target.value as "income" | "expense")}
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
            value={formTransaction.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formTransaction.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};

const RecentTransactionsCard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTransaction = async (transaction: Transaction) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }
      toast.success(transaction.id ? "Transaction updated successfully!" : "Transaction added successfully!");
      fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast.error("Failed to save transaction.");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      toast.success("Transaction deleted successfully!");
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <ul className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"} ${transaction.amount.toFixed(2)}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingTransaction(transaction)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{transaction.id ? "Edit Transaction" : "New Transaction"}</DialogTitle>
                        <DialogDescription>Make changes to your transaction here.</DialogDescription>
                      </DialogHeader>
                      {editingTransaction && (
                        <TransactionForm
                          transaction={editingTransaction}
                          onSave={handleSaveTransaction}
                          onClose={() => setEditingTransaction(null)}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(transaction.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;

