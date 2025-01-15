"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, CreditCard } from 'lucide-react'
import { getLoggedInUser } from "@/lib/actions/user.actions"

// Mock data for banks and credit card
const mockBanks = [
  { id: 1, name: "Bank of America", accountType: "Checking", accountNumber: "****1234" },
  { id: 2, name: "Chase", accountType: "Savings", accountNumber: "****5678" },
]

const mockCreditCard = {
  bank: "Citibank",
  type: "Visa",
  number: "****9012",
  expiryDate: "12/25",
}

export default function LinkedAccountsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser()
      if (loggedInUser) {
        setUser(loggedInUser)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Linked Accounts</h1>
      
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user.name}</CardTitle>
            <CardDescription>Manage your linked bank accounts and credit cards</CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Banks</CardTitle>
          <CardDescription>Your linked bank accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {mockBanks.map((bank) => (
            <div key={bank.id} className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">{bank.name}</h3>
                <p className="text-sm text-muted-foreground">{bank.accountType} - {bank.accountNumber}</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          ))}
          <div className="mt-4">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Link New Bank
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Credit Card</CardTitle>
          <CardDescription>Your linked credit card</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <CreditCard className="h-10 w-10" />
              <span className="text-lg font-bold">{mockCreditCard.bank}</span>
            </div>
            <div className="mb-4">
              <span className="text-lg">{mockCreditCard.number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{user?.name}</span>
              <span>Exp: {mockCreditCard.expiryDate}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline">Manage Credit Card</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

