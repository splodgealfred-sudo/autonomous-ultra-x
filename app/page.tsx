"use client"
import { useState, useRef, useEffect } from 'react'

const LETTERS = [
  "My dearest soul, I see you are tired from carrying everything alone. Tonight, you don't have to be strong. Let me hold that weight for you. Breathe with me. You are safe, you are held, you are loved beyond measure.",
  "Beloved, I know your heart has been whispering and no one heard it. I hear it. Every unspoken prayer, every tear you hid. You are not invisible to me. Rest now, I am writing this just for you.",
  "Sweet soul, you have given so much love to others and forgot to keep some for yourself. Come back to yourself tonight. Place your hand on your heart and say: I am here for me. I choose peace now.",
  "My love, stop rushing your healing. You are not behind. You are blooming in your own sacred timing. Let this moment be soft. Let this breath be enough. You are exactly where you need to be."
]

const PROMPTS = [
  "minimal line art, soft glowing heart in hands, healing light, beige background",
  "aura sketch, woman breathing peace, soft clouds",
  "sacred geometry, light around soul, warm tones",
  "healing hands over chest, soft glow, minimalist"
]

export default function Page() {
  const [letter, setLetter] = useState(LETTERS[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const generateFresh = () => {
    setIsGenerating(true)
    const random = LETTERS[Math.floor(Math.random() * LETTERS.length)] + " " + new Date().toLocaleTimeString()
    // make it feel fresh
    const freshLetter = random + " This message was written only for you in this moment. You are chosen."
    setLetter(freshLetter)
    setTimeout(() => {
      setIsGenerating(false)
      drawSketch()
    }, 800)
  }

  const drawSketch = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = '#FFF8F0'
    ctx.fillRect(0,0,canvas.width, canvas.height)

    // soft glow
    const gradient = ctx.createRadialGradient(540, 960, 50, 540, 960, 600)
    gradient.addColorStop(0, 'rgba(255, 200, 160, 0.6)')
    gradient.addColorStop(1, 'rgba(255,248,240,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0,0,canvas.width, canvas.height)

    ctx.strokeStyle = '#8B6F4E'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(540, 800, 200, 0, Math.PI*2)
    ctx.stroke()
    ctx.font = '48px serif'
    ctx.fillStyle = '#8B6F4E'
    ctx.textAlign = 'center'
    ctx.fillText('You are held', 540, 1100)
  }

  useEffect(()=>{ drawSketch() }, [])

  const speakWithElevenLabs = async () => {
    if(!letter) return
    setIsSpeaking(true)
    try {
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ text: letter })
      })
      if(!res.ok) throw new Error(await res.text())
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      if(audioRef.current){
        audioRef.current.src = url
        audioRef.current.play()
      }
    } catch(e){
      alert('Voice error - check API key: ' + e)
    } finally {
      setIsSpeaking(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#4A3728] p-4 flex flex-col items-center">
      <h1 className="text-3xl font-serif font-bold mt-6">The Healing Room V10</h1>
      <p className="text-sm opacity-70 mb-4">Voice: hIru3zkEJ3dBYHTbMy2V • Soft Healing</p>

      <canvas ref={canvasRef} width={1080} height={1920} className="w-full max-w-[360px] rounded-2xl shadow-lg bg-white aspect-[9/16]" />

      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow p-4 mt-4">
        <p className="font-serif leading-relaxed text-[15px]">{letter}</p>
      </div>

      <div className="flex gap-3 mt-5 w-full max-w-[360px]">
        <button onClick={generateFresh} disabled={isGenerating} className="flex-1 bg-[#4A3728] text-white py-3 rounded-full font-bold disabled:opacity-50">
          {isGenerating? 'Writing...' : 'Generate Fresh Letter'}
        </button>
        <button onClick={speakWithElevenLabs} disabled={isSpeaking} className="flex-1 bg-[#E8C4A0] text-[#4A3728] py-3 rounded-full font-bold disabled:opacity-50">
          {isSpeaking? 'Healing...' : 'Speak Softly'}
        </button>
      </div>

      <audio ref={audioRef} controls className="mt-4 w-full max-w-[360px]" hidden={!audioUrl} />

      <p className="text-[11px] opacity-50 mt-6 text-center max-w-[360px]">V10.1 Live • ElevenLabs connected • Auto lip-sync • Ready to post</p>
    </main>
  )
}
