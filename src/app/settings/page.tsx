"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { logoutAccount, getLoggedInUser } from "@/lib/actions/user.actions"
import PlaidLink from "@/components/PlaidLink"

// This is a placeholder. Replace with actual currency data.
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "INR", name: "Indian Rupee"},
]

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser()
      setUser(loggedInUser)
    }
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await logoutAccount()
      router.push("/sign-in")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCurrencyChange = (value: string) => {
    setCurrency(value)
    // Here you would typically update this in your backend or state management system
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <>
              <div>
                <Label>Name</Label>
                <p className="text-sm text-muted-foreground">{user.name || "Anonymous User"}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">********</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.name} ({curr.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-medium">Bank Account</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Link your bank account for automatic transaction tracking
                </p>
                <Button asChild>
                <PlaidLink user={user} variant="primary" />
                </Button>
              </div>
              <div className="pt-4">
                <Button variant="destructive" onClick={handleSignOut} disabled={isLoading}>
                  {isLoading ? "Signing out..." : "Sign out"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please log in to manage your account settings.
              </p>
              <Button asChild>
                <Link href="/login">Login / Signup</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

