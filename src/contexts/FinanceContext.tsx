"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Transaction = {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
}

type FinanceContextType = {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  balance: number
  income: number
  expense: number
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Initial transactions - you can modify these as needed
const initialTransactions: Transaction[] = [
  { id: '1', description: "Salary", amount: 5000, type: 'income', category: 'Salary', date: '2023-06-01' },
  { id: '2', description: "Rent", amount: 1500, type: 'expense', category: 'Housing', date: '2023-06-05' },
  { id: '3', description: "Groceries", amount: 200, type: 'expense', category: 'Food', date: '2023-06-10' },
]

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions(prev => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...updatedTransaction, id } : t))
  }

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const calculateFinances = () => {
    let totalIncome = 0
    let totalExpense = 0

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount
      } else {
        totalExpense += transaction.amount
      }
    })

    return {
      balance: totalIncome - totalExpense,
      income: totalIncome,
      expense: totalExpense
    }
  }

  const { balance, income, expense } = calculateFinances()

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    balance,
    income,
    expense
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}

