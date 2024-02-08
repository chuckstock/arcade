'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainNav() {
  const pathname = usePathname()

  return (
    <nav className='flex w-full justify-between items-center py-4 max-w-6xl'>
      <Link href='/'>
        <Icons.gamePad className='text-green-500 w-10 h-10' />
      </Link>
      <div className='flex space-x-6'>
        {/* <Link className="hover:underline" href="#">
            Points
          </Link>
          <Link className="hover:underline" href="#">
            Bounties
          </Link> */}
        <Link
          className={cn(
            'hover:underline',
            pathname === '/tokenomics' && 'text-green-500'
          )}
          href='/tokenomics'
        >
          Tokenomics
        </Link>
        <Link
          href='/faq'
          className={cn(
            'hover:underline',
            pathname === '/faq' && 'text-green-500'
          )}
        >
          FAQ
        </Link>
      </div>
      {/* <Button>Connect Wallet</Button> */}
      <div />
    </nav>
  )
}
