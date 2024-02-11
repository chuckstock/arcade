import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frame Debugger',
  description: 'Help identify and fix issues with your frames',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <div className='font-mono bg-slate-100 text-black'>{children}</div>
}
