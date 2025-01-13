'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
import supabase from '@/config/supabaseclient'
import { useEffect, useState } from 'react'
import { User as SupabaseUser} from "@supabase/supabase-js";


const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user || null) // Set user data if logged in
    }
    fetchSession()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null) // Clear user state on logout
    router.push('/login') // Redirect to login page
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
          {user ? (
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
                <Button onClick={logout}>
                  <DropdownMenuItem asChild>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Login button if not logged in
            <Button onClick={() => router.push('/login')}>Log in</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
