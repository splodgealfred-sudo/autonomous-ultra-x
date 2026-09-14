import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    const apiKey = process.env.ELEVENLABS_API_KEY
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'hIru3zkEJ3dBYHTbMy2V'

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing ELEVENLABS_API_KEY' }, { status: 500 })
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
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.4,
          use_speaker_boost: true
        }
      })
    })

    if (!r.ok) {
      const err = await r.text()
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const buf = await r.arrayBuffer()
    return new NextResponse(buf, {
      headers: { 'Content-Type': 'audio/mpeg' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
