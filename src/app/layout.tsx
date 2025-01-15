import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import BottomNav from '@/components/bottom-nav'
import { FinanceProvider } from '@/contexts/FinanceContext'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React, { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Financy - Spendings Made Smart',
  description: 'Track your finances, set budgets, and achieve your financial goals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user') // Retrieve the stored user from localStorage
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser)) // Parse the user data
    } else {
      // If no user is found in localStorage, fetch from API
      const fetchUser = async () => {
        const user = await getLoggedInUser()
        if (user) {
          setLoggedInUser(user)
          localStorage.setItem('user', JSON.stringify(user)) // Store user data in localStorage
        }
      }
      fetchUser()
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FinanceProvider>
            <Header />
            <main className="container mx-auto px-4 py-8 pb-20">
              {children}
            </main>
            <BottomNav />
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
