import { NextServerPageProps } from '@/lib/utils'
import { getFrameMetadata } from '@coinbase/onchainkit'
import { kv } from '@vercel/kv'
import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  // Fetchs some basic stats to pass to metadata
  const flipCount = await kv.get('flips')

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Play ▶️',
      },
      {
        label: 'Leaderboard 🏆',
      },
    ],
    image: `${process.env.NEXT_PUBLIC_HOST}/api/images/splash?flips=${1000}`,
    post_url: `${
      process.env.NEXT_PUBLIC_HOST
    }/api/menu?buttons=${encodeURIComponent(
      'start,leaderboard' // Buttons should be passed to the menu router
    )}`,
  })

  return {
    title: "Farcaster Arcade - Let's Play!",
    description: '',
    openGraph: {
      title: "Farcaster Arcade - Let's Play!",
      description: '',
      images: [`${process.env.DOMAIN}/api/image/splash?flips=${1000}`],
    },
    other: {
      ...frameMetadata,
    },
  }
}
export default async function Home({ searchParams }: NextServerPageProps) {
  return (
    <section className='max-w-3xl mx-auto h-full'>
      {/* <h1 className='text-center text-6xl mb-8'>Farcade</h1> */}
      <div className='flex flex-col w-full justify-center items-center h-full pt-20 sm:pt-40'>
        <Image
          src='/images/arcade.webp'
          alt='arcade machine'
          width='400'
          height='400'
        />
      </div>
    </section>
  )
}
