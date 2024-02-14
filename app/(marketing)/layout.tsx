import MainNav from '@/components/main-nav'
import { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex justify-center border-b border-gray-700 '>
        <MainNav />
      </div>
      <main className='flex-1 px-8 py-12 h-full'>{children}</main>
      {/* TODO: add footer and github links */}
      {/* <footer className='flex justify-center items-center space-x-4 py-4 border-t border-gray-700'> */}
      {/* <TwitterIcon className='w-6 h-6 hover:text-purple-500' />
        <a href='https://github.com/chuckstock/arcade'>
          <GithubIcon className='w-6 h-6 hover:text-purple-500' />
        </a> */}
      {/* <DiscIcon className="w-6 h-6 hover:text-purple-500" />
        <SignalMediumIcon className="w-6 h-6 hover:text-purple-500" />
        <SignalIcon className="w-6 h-6 hover:text-purple-500" /> */}
      {/* </footer> */}
    </div>
  )
}
