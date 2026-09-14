"use client"
import { useState } from 'react'

const LETTERS = [
  "If no one told you today, you are held. Even in the heaviness, even when your heart feels tired — you are not alone. Breathe with me. Inhale, exhale. You are safe to rest here.",
  "Dear soft heart, you don't have to be strong today. You are allowed to feel it all and still be held. The world can wait. Your healing cannot be rushed. You are held.",
  "You have carried so much in silence. Let this be the moment you set it down, even for a minute. You are not broken. You are becoming. And you are held, deeply held.",
  "To the woman reading this at night: you did enough today. You are enough today. Close your eyes, let your shoulders drop. You are held."
]

export default function Home() {
  const [letter, setLetter] = useState(LETTERS[0])
  const [status, setStatus] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const newLetter = () => {
    setLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)])
    setStatus('')
  }

  const speak = async () => {
    try {
      setIsSpeaking(true)
      setStatus('Creating soft voice...')
      
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: letter })
      })

      const data = await res.clone().json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error || 'Speak failed - check Vercel logs')
      }

      // if ok, it's audio
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      
      setStatus('Playing... ready for Facebook')
      audio.onended = () => {
        setIsSpeaking(false)
        setStatus('Done - ready to post this on Facebook 🤍')
      }
      await audio.play()

    } catch (err: any) {
      setIsSpeaking(false)
      setStatus(`Error: ${err.message.slice(0, 200)}`)
      console.error(err)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f6f1eb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Georgia, serif' }}>
      <div style={{ background: 'white', maxWidth: 520, width: '100%', borderRadius: 28, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ letterSpacing: 6, fontSize: 11, opacity: 0.5, margin: 0 }}>YOU ARE HELD</p>
          <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>Voice: 21m00Tcm4TlvDq8ikWAM • Rachel • Free • Facebook Ready</p>
        </div>

        <p style={{ fontSize: 23, lineHeight: 1.65, textAlign: 'center', minHeight: 180 }}>{letter}</p>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={newLetter} style={{ flex: 1, padding: 16, borderRadius: 100, border: '1px solid #e5ddd4', background: 'white', cursor: 'pointer' }}>
            New Letter
          </button>
          <button onClick={speak} disabled={isSpeaking} style={{ flex: 1, padding: 16, borderRadius: 100, border: 'none', background: isSpeaking ? '#ccc' : 'black', color: 'white', cursor: 'pointer' }}>
            {isSpeaking ? 'Healing...' : 'Speak Softly'}
          </button>
        </div>

        {status && <p style={{ textAlign: 'center', fontSize: 12, marginTop: 16, opacity: 0.7, wordBreak: 'break-word' }}>{status}</p>}
        
        <p style={{ textAlign: 'center', fontSize: 11, opacity: 0.3, marginTop: 24 }}>V11.2 Latest - POST 500 Fixed</p>
      </div>
    </main>
  )
}