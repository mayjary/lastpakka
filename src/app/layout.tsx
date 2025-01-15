import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import BottomNav from '@/components/bottom-nav'
import { FinanceProvider } from '@/contexts/FinanceContext'

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

