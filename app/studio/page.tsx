"use client";
import { useState, useRef } from "react";

const AVATARS = [
  {name:"🔥 Limpopo Hustler (You)", img:"https://i.pravatar.cc/500?img=68", voiceRate:1},
  {name:"💅 Baddie Storytime", img:"https://i.pravatar.cc/500?img=5", voiceRate:1.1},
  {name:"🎙️ Podcast Bro", img:"https://i.pravatar.cc/500?img=15", voiceRate:0.95},
  {name:"👑 SA Queen", img:"https://i.pravatar.cc/500?img=32", voiceRate:1.05},
]

export default function Page(){
  const [output, setOutput] = useState("[HOOK 0-3s]: I was BROKE in my bedroom in South Africa... My friends laughed when I coded at 3AM. Now my AI makes videos while I sleep.");
  const [selected, setSelected] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");

  const generateViral = () => {
    const hooks = [
      `I was BROKE in Makhuduthamaga. No job. No money. My mom said get a real job.\nAt 3AM I built AUTONOMOUS ULTRA X.\nFirst night: 847 views.\nWeek 1: $847.\nNow? I don't edit videos. My AI hires people to talk for me.`,
      `POV: You live in Limpopo and your AI clone makes more money than your lecturer.\nThis is not CapCut. This is not dropshipping.\nThis is an autonomous avatar that sells while you sleep.`,
      `They laughed: "Alfred stop playing with AI".\nNow they ask me for jobs.\nI built a factory where AI humans talk for me 24/7.\nLink in bio before TikTok bans this.`
    ];
    setOutput(hooks[Math.floor(Math.random()*hooks.length)]);
  }

  const generateTalkingVideo = async () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const avatarImg = new Image();
    avatarImg.crossOrigin = "anonymous";
    avatarImg.src = AVATARS[selected].img;
    await new Promise(r=> avatarImg.onload = r);

    setStatus("🎬 DIRECTING YOUR AI ACTOR...");
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, {mimeType:'video/webm'});
    let chunks:Blob[] = [];
    recorder.ondataavailable = e=> chunks.push(e.data);
    recorder.onstop = ()=>{
      const blob = new Blob(chunks, {type:'video/webm'});
      (window as any).myBlob = blob;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `talking-avatar-${Date.now()}.webm`; a.click();
      setStatus("✅ VIRAL AVATAR VIDEO DOWNLOADED! Post it now!");
    };
    recorder.start();

    // Voice
    const utter = new SpeechSynthesisUtterance(output);
    utter.rate = AVATARS[selected].voiceRate;
    speechSynthesis.speak(utter);

    let frame=0; const total=30*15;
    let mouthOpen=0;

    // Fake audio analyzer - mouth moves with speech
    const draw = () => {
      // Background - viral gradient
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,1080,1920);
      const grad = ctx.createRadialGradient(540,400,100,540,400,800);
      grad.addColorStop(0,"#1a0033"); grad.addColorStop(1,"#000");
      ctx.fillStyle = grad; ctx.fillRect(0,0,1080,1920);

      // Avatar circle crop
      ctx.save();
      ctx.beginPath(); ctx.arc(540, 700, 320, 0, Math.PI*2); ctx.clip();
      ctx.drawImage(avatarImg, 220, 380, 640, 640);

      // Talking mouth effect - scale bottom of face
      mouthOpen = Math.abs(Math.sin(frame/3)) * (speechSynthesis.speaking? 18 : 2) + Math.random()*5;
      ctx.translate(540, 850);
      ctx.scale(1, 1 + mouthOpen/100);
      ctx.translate(-540, -850);

      ctx.restore();

      // Glow border
      ctx.strokeStyle = "#00FF88"; ctx.lineWidth=8;
      ctx.beginPath(); ctx.arc(540,700,325,0,Math.PI*2); ctx.stroke();

      // Captions - viral bold style
      ctx.fillStyle="#fff"; ctx.font="900 55px system-ui"; ctx.textAlign="center";
      const words = output.split(' ');
      const idx = Math.floor((frame/total)*words.length);
      const chunk = words.slice(idx, idx+7).join(' ');
      // text background
      ctx.fillStyle="rgba(0,0,0,0.7)"; ctx.fillRect(40, 1150, 1000, 200);
      ctx.fillStyle="#fff"; ctx.fillText(chunk.substring(0,35), 540, 1230, 900);
      ctx.fillStyle="#00FF88"; ctx.font="800 32px system-ui";
      ctx.fillText("AUTONOMOUS ULTRA X", 540, 1350);

      frame++;
      if(frame < total) requestAnimationFrame(draw);
      else recorder.stop();
    };
    draw();
  }

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16,fontFamily:"system-ui"}}>
      <h1 style={{fontSize:26}}>⚡ ULTRA X V3 - TALKING AVATARS</h1>
      <p style={{color:"#888"}}>Trending: Real people talking</p>

      <select value={selected} onChange={e=>setSelected(parseInt(e.target.value))} style={{width:"100%",padding:12,borderRadius:12,background:"#111",color:"#fff",marginBottom:10}}>
        {AVATARS.map((a,i)=><option key={i} value={i}>{a.name}</option>)}
      </select>

      <button onClick={generateViral} style={{width:"100%",padding:14,background:"#00FF88",color:"#000",fontWeight:900,borderRadius:12}}>🧠 GENERATE VIRAL HOOK</button>
      <textarea value={output} onChange={e=>setOutput(e.target.value)} style={{width:"100%",height:100,background:"#111",color:"#fff",borderRadius:12,padding:12,marginTop:10}} />

      <button onClick={generateTalkingVideo} style={{width:"100%",padding:16,background:"#FF0055",color:"#fff",fontWeight:900,borderRadius:12,fontSize:18,marginTop:10}}>🎬 GENERATE TALKING AVATAR VIDEO</button>
      <p style={{color:"#00FF88"}}>{status}</p>
      <canvas ref={canvasRef} width={1080} height={1920} style={{width:"100%",borderRadius:24,background:"#111",marginTop:12}} />
      <p style={{color:"#666",fontSize:12,marginTop:20}}>TIP: Use V3 videos for TikTok Shop + YouTube Shorts. Real humans = 5x more views than text videos.</p>
    </div>
  )
}
