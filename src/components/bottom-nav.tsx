'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PieChart, Settings, PlusCircle, CreditCard } from 'lucide-react'

const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/" className={`p-2 ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Home size={24} />
            </Link>
          </li>
          <li>
            <Link href="/budget" className={`p-2 ${pathname === '/budget' ? 'text-primary' : 'text-muted-foreground'}`}>
              <PieChart size={24} />
            </Link>
          </li>
          <li>
            <Link href="/add-transaction" className="p-2 text-primary">
              <PlusCircle size={32} />
            </Link>
          </li>
          <li>
            <Link href="/linked-accounts" className={`p-2 ${pathname === '/linked-accounts' ? 'text-primary' : 'text-muted-foreground'}`}>
              <CreditCard size={24} />
            </Link>
          </li>
          <li>
            <Link href="/settings" className={`p-2 ${pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Settings size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default BottomNav

