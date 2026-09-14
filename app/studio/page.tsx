"use client"
import { useState } from 'react'

const letters = [
  "If no one told you today, you are held. Even in the heaviness, even when your heart feels tired — you are not alone. Breathe with me. Inhale, exhale. You are safe to rest here.",
  "Dear soft heart, you don't have to be strong today. You are allowed to feel it all and still be held. The world can wait. Your healing cannot be rushed. You are held.",
  "You have carried so much in silence. Let this be the moment you set it down, even for a minute. You are not broken. You are becoming. And you are held, deeply held."
]

export default function Home() {
  const [letter, setLetter] = useState(letters[0])
  const [playing, setPlaying] = useState(false)

  const generate = () => {
    const next = letters[Math.floor(Math.random() * letters.length)]
    setLetter(next)
  }

  const speak = async () => {
    try {
      setPlaying(true)
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: letter })
      })
      if (!res.ok) throw new Error(await res.text())
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.onended = () => setPlaying(false)
      await audio.play()
    } catch (e: any) {
      alert(e.message)
      setPlaying(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f6f1eb', padding: 24, fontFamily: 'serif' }}>
      <div style={{ width: '100%', maxWidth: 500, background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 14, letterSpacing: 4, opacity: 0.5 }}>YOU ARE HELD</h1>
        <p style={{ fontSize: 22, lineHeight: 1.6, margin: '32px 0' }}>{letter}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={generate} style={{ flex: 1, padding: 16, borderRadius: 100, border: '1px solid #ddd', background: 'white' }}>Generate Fresh Letter</button>
          <button onClick={speak} style={{ flex: 1, padding: 16, borderRadius: 100, border: 'none', background: playing? '#ccc' : 'black', color: 'white' }}>{playing? 'Healing...' : 'Speak Softly'}</button>
        </div>
        <p style={{ fontSize: 12, opacity: 0.4, marginTop: 24 }}>V10.1 Live • ElevenLabs Rachel • Ready to post on Facebook</p>
      </div>
    </main>
  )
}
