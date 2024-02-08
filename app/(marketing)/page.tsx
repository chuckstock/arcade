import { DEBUG_HUB_OPTIONS } from '@/app/(frames)/debug/constants'
import { getTokenUrl } from 'frames.js'
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from 'frames.js/next/server'

type State = {
  active: string
  total_button_presses: number
}

const initialState = { active: '1', total_button_presses: 0 }

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : '1',
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
  frameMessage

  console.log('info: state is:', state)

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage

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
      <FrameContainer
        postUrl='/frames'
        state={state}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage>
          <div tw='w-full h-full bg-slate-700 text-white justify-center items-center'>
            {frameMessage?.inputText ? frameMessage.inputText : 'Hello world'}
          </div>
        </FrameImage>
        <FrameInput text='put some text here' />
        <FrameButton onClick={dispatch}>
          {state?.active === '1' ? 'Active' : 'Inactive'}
        </FrameButton>
        <FrameButton onClick={dispatch}>
          {state?.active === '2' ? 'Active' : 'Inactive'}
        </FrameButton>
        <FrameButton
          mint={getTokenUrl({
            address: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
            tokenId: '123',
            chainId: 7777777,
          })}
        >
          Mint
        </FrameButton>
        <FrameButton href={`https://www.google.com`}>External</FrameButton>
      </FrameContainer>
    </section>
  )
}
