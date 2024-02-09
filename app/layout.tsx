import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const inter = Press_Start_2P({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Farcade',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'dark')}>{children}</body>
    </html>
  )
}
