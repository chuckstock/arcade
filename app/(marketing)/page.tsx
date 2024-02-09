import { DEBUG_HUB_OPTIONS } from '@/app/(frames)/debug/constants'
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from 'frames.js/next/server'

const initialState = {
  active: null as string | null,
  total_button_presses: 0,
  page: 'start' as 'start' | 'flip',
}

type State = typeof initialState

const reducer: FrameReducer<State> = (state, action) => {
  let buttonIndex = action.postBody?.untrustedData.buttonIndex
  let active = buttonIndex !== null ? String(buttonIndex) : null
  let page = state.page
  if (state.page === 'start') {
    page = 'flip'
    active = null
  }

  return {
    page,
    total_button_presses: state.total_button_presses + 1,
    active,
  }
}

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams)

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
    fetchHubContext: true,
  })

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error('Invalid frame payload')
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  )

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  // Example with satori and sharp:
  // const imageUrl = await

  console.log('info: state is:', state)

  if (frameMessage) {
    console.log('info: frameMessage is:', frameMessage)
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'

  // then, when done, return next frame
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
      <FrameContainer
        postUrl='/frames'
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage>
          <div tw='w-full h-full bg-slate-700 text-white justify-center items-center'>
            {(() => {
              switch (state.page) {
                case 'start': {
                  return 'Press Start'
                }
                case 'flip': {
                  return state.active === '1'
                    ? 'Heads'
                    : state.active === '2'
                    ? 'Tails'
                    : 'Flip a Coin'
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
      </FrameContainer>
    </section>
  )
}
