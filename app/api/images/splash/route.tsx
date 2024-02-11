import { ImageResponse } from 'next/og'

export const runtime = 'edge' // Serve on the edge runtime for faster response times

export async function GET(request: Request) {
  // // Make sure the font exists in the specified path:
  // const fontData = await fetch(
  //   new URL("../../../../../assets/Silkscreen-Regular.ttf", import.meta.url)
  // ).then((res) => res.arrayBuffer());

  const imageData = await fetch(
    new URL('../../../../public/images/coin-heads.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  let flipCount = 0
  const { searchParams } = new URL(request.url)
  if (searchParams.has('flips')) {
    flipCount = parseInt(searchParams.get('flips') as string)
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          padding: '50px 100px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Typewriter"',
        }}
      >
        <img
          width='1200'
          height='630'
          // @ts-ignore
          src={imageData}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            objectFit: 'cover',
            opacity: 0.7,
          }}
        />

        {flipCount && flipCount > 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 0,
              position: 'absolute',
              bottom: 30,
              background: 'rgba(0,0,0,0.7)',
              padding: '0 20px',
              lineHeight: '18px',
              fontSize: 36,
              width: '100%',
            }}
          >
            {/* <p>👑 Join {flipCount as React.ReactNode} players</p> */}
            <p>Already {flipCount as React.ReactNode} flips</p>
          </div>
        ) : (
          ''
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // fonts: [
      //   {
      //     name: 'Silkscreen',
      //     data: fontData,
      //     style: 'normal',
      //   },
      // ],
    }
  )
}

export const POST = GET
