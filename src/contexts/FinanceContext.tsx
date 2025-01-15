"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type User = {
  $id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type Transaction = {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
}

type Budget = {
  id: string
  category: string
  budgeted: number
  spent: number
}

type Goal = {
  id: string
  name: string
  target: number
  current: number
}

type FinanceContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  balance: number
  income: number
  expense: number
  budgets: Budget[]
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void
  updateBudget: (id: string, budget: Omit<Budget, 'id'>) => void
  deleteBudget: (id: string) => void
  goals: Goal[]
  addGoal: (goal: Omit<Goal, 'id' | 'current'>) => void
  updateGoal: (id: string, goal: Omit<Goal, 'id'>) => void
  deleteGoal: (id: string) => void
  currency: string
  setCurrency: (currency: string) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

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

  const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget = { ...budget, id: Date.now().toString(), spent: 0 }
    setBudgets(prev => [...prev, newBudget])
  }

  const updateBudget = (id: string, updatedBudget: Omit<Budget, 'id'>) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...updatedBudget, id } : b))
  }

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id))
  }

  const addGoal = (goal: Omit<Goal, 'id' | 'current'>) => {
    const newGoal = { ...goal, id: Date.now().toString(), current: 0 }
    setGoals(prev => [...prev, newGoal])
  }

  const updateGoal = (id: string, updatedGoal: Omit<Goal, 'id'>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...updatedGoal, id } : g))
  }

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id))
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
    user,
    setUser,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    balance,
    income,
    expense,
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    currency,
    setCurrency
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

