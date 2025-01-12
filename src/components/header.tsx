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

const Header = () => {
  const pathname = usePathname()

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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/login" passHref>
                <DropdownMenuItem asChild>
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

