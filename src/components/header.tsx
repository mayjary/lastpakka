'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/mode-toggle'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
import { useFinance } from '@/contexts/FinanceContext'

const Header = () => {
  const pathname = usePathname()
  const { user, setUser } = useFinance()

  const handleLogout = () => {
    setUser(null)
    // Add any additional logout logic here (e.g., clearing other stored data)
  }

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Financy
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className={`text-foreground hover:text-primary ${pathname === '/' ? 'font-bold' : ''}`}>
            Dashboard
          </Link>
          <Link href="/budget" className={`text-foreground hover:text-primary ${pathname === '/budget' ? 'font-bold' : ''}`}>
            Budget
          </Link>
          <Link href="/goals" className={`text-foreground hover:text-primary ${pathname === '/goals' ? 'font-bold' : ''}`}>
            Goals
          </Link>
          <Link href="/settings" className={`text-foreground hover:text-primary ${pathname === '/settings' ? 'font-bold' : ''}`}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/sign-in">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/sign-up">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

