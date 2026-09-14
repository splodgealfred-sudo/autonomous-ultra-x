import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ELEVENLABS_API_KEY missing in Vercel' }, { status: 500 })
    }

    // RACHEL - Free voice, always works
    const voiceId = '21m00Tcm4TlvDq8ikWAM'

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: text.substring(0, 1000), // free plan limit
          model_id: 'eleven_flash_v2_5',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true
          }
        }),
      }
    )

    if (!elevenRes.ok) {
      const errText = await elevenRes.text()
      console.log('ElevenLabs error:', errText)
      return NextResponse.json({ error: errText }, { status: 500 })
    }

    const audioBuffer = await elevenRes.arrayBuffer()
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString()
      },
    })

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}