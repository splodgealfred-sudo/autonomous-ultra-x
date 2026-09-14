import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    const apiKey = process.env.ELEVENLABS_API_KEY
    // HARDCODED RACHEL - works on free plan
    const voiceId = '21m00Tcm4TlvDq8ikWAM'

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
    }

    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.7, similarity_boost: 0.7 }
      })
    })

    if (!r.ok) {
      const err = await r.text()
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const buf = await r.arrayBuffer()
    return new NextResponse(buf, { headers: { 'Content-Type': 'audio/mpeg' } })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}