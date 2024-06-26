import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}
export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get('text')

    return new ImageResponse(
      (
        <div
          tw="text-6xl bg-blue-500 w-full h-full flex flex-col items-center justify-center text-white"
          style={{ display: 'flex' }}
        >
          {text}
          <div tw="absolute bottom-0 right-0 m-4" style={{ display: 'flex' }}>
            <span tw="text-white text-xl">Merlin</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'fluent',
      }
    )
  } catch (e: any) {
    console.error(`Open Graph image couldn't be generated. ${e.message}`)
    return
  }
}
