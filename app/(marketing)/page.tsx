import { NextServerPageProps } from '@/lib/utils'
import { getFrameMetadata } from '@coinbase/onchainkit'
import { kv } from '@vercel/kv'
import { Metadata } from 'next'

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
    <section className='max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold mb-6 text-yellow-400'>$COINS</h1>
      <div className='flex flex-col space-y-6'>
        <p>
          Coins, an ERC-20 token on Base, will launch in February 2024 with an
          airdrop to the Arcade community on Farcaster. Coins will be used to
          play games, earn rewards, and participate in governance.
        </p>
        <p>
          The purpose of the Arcade is to build a collection of the must fun
          "Coin Operated Frames" for playing games on Farcaster.
        </p>
      </div>
      <h1 className='text-4xl font-bold mb-6 mt-8 text-yellow-400'>
        Arcade Machines
      </h1>
      <div className='flex flex-col space-y-6'>
        <p>
          The Arcade Machines are a collection of NFTs that represent the
          virtual machines that will be used to play games on Farcaster.
        </p>
        <p>
          Machine owners will be able to upgrade and add different games to
          their machines. The more of the games that are played on their
          machine, the more $COINS they will earn.
        </p>
        <p>
          Games will have a limited number of arcade machines that they can be
          played on. So there will be initial gaming launches for every new game
          launched in the Arcade.
        </p>
      </div>
      {/* <FrameContainer
        postUrl='/api/frames'
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          <div tw='w-full h-full bg-slate-700 text-white justify-center items-center'>
            <h1>test</h1>
            {(() => {
              switch (state.page) {
                case 'start': {
                  return 'Press Start'
                }
                case 'flip': {
                  return state.selected || 'Flip a Coin'
                }
                default: {
                  return 'Flip a Coin'
                }
              }
            })()}
          </div>
        </FrameImage>
        {state.page === 'start' ? (
          <FrameButton onClick={dispatch}>🪙 Start</FrameButton>
        ) : null}

        {state.page === 'flip' ? (
          <FrameButton key='1' onClick={dispatch}>
            Heads
          </FrameButton>
        ) : null}
        {state.page === 'flip' ? (
          <FrameButton key='2' onClick={dispatch}>
            Tails
          </FrameButton>
        ) : null}
      </FrameContainer> */}
    </section>
  )
}
