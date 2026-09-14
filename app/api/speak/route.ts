import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    const apiKey = process.env.ELEVENLABS_API_KEY
    const voiceId = '21m00Tcm4TlvDq8ikWAM' // Rachel - free, works

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: text.slice(0, 4000), // limit for free plan
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.7, similarity_boost: 0.7 }
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const audio = await response.arrayBuffer()
    return new NextResponse(audio, {
      headers: { 'Content-Type': 'audio/mpeg' },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
