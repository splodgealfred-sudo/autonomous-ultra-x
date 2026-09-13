"use client";
import { useState, useRef } from "react";

export default function Page(){
  const [output, setOutput] = useState("POV: Broke student in Makhuduthamaga builds AI that hires people to talk for him. My friends laughed. Now they ask for jobs. Link in bio.");
  const [avatar, setAvatar] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");

  const AVATARS = [
    {name:"🔥 Limpopo Hustler", color:"#00FF88", letter:"A"},
    {name:"💅 Baddie Storytime", color:"#FF00FF", letter:"B"},
    {name:"🎙️ Podcast Bro", color:"#00F5FF", letter:"P"},
    {name:"👑 SA Queen", color:"#FFD700", letter:"Q"},
  ];

  const genHook = () => {
    const hooks = [
      "I was BROKE in Makhuduthamaga. My mom said get a real job. At 3AM I built AUTONOMOUS ULTRA X. First night: 847 views. Week 1: $847. Now I don't edit. My AI talks for me.",
      "POV: You live in Limpopo and your AI clone makes more than your lecturer. This is not CapCut. This is autonomous avatar selling while you sleep.",
      "They said Alfred stop playing with AI. Now they ask me for jobs. I built a factory where AI humans talk 24/7. Link in bio before they delete this."
    ];
    setOutput(hooks[Math.floor(Math.random()*hooks.length)]);
    setStatus("✅ Viral hook generated! Now click PINK button");
  }

  const genVideo = async () => {
    try{
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      setStatus("🎬 STARTING... Check sound ON!");

      const stream = (canvas as any).captureStream(30);
      const mime = MediaRecorder.isTypeSupported('video/webm')? 'video/webm' : 'video/mp4';
      const recorder = new MediaRecorder(stream, {mimeType: mime});
      let chunks: Blob[] = [];
      recorder.ondataavailable = e=> { if(e.data.size>0) chunks.push(e.data) };
      recorder.onstop = ()=>{
        try{
          const blob = new Blob(chunks, {type: mime});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = `ultra-x-${Date.now()}.webm`; document.body.appendChild(a); a.click(); a.remove();
          setStatus("✅ VIDEO DOWNLOADED! Check your gallery/files! 🎉");
        }catch(e){ setStatus("Error saving: "+e) }
      };
      recorder.start(100);

      // TTS
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(output);
      utter.rate = 0.9; utter.volume = 1;
      window.speechSynthesis.speak(utter);

      let frame=0; const total=30*12;
      const colors = AVATARS[avatar].color;

      const draw = () => {
        // bg
        ctx.fillStyle="#000"; ctx.fillRect(0,0,1080,1920);
        const g = ctx.createRadialGradient(540,600,50,540,600,900);
        g.addColorStop(0, colors+"33"); g.addColorStop(1,"#000");
        ctx.fillStyle=g; ctx.fillRect(0,0,1080,1920);

        // avatar circle - NO IMAGE - just letter (no CORS)
        ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(540,650,280,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=colors; ctx.lineWidth=12; ctx.stroke();
        ctx.fillStyle=colors; ctx.font="900 300px system-ui"; ctx.textAlign="center";
        // mouth anim based on speaking
        const mouth = window.speechSynthesis.speaking? Math.abs(Math.sin(frame/4))*25 + 5 : 2;
        ctx.save();
        ctx.translate(540, 720);
        ctx.scale(1, 1 + mouth/80);
        ctx.fillText(AVATARS[avatar].letter, 0, 100);
        ctx.restore();

        // captions
        ctx.fillStyle="rgba(255,255,255,0.95)";
        ctx.fillRect(40, 1100, 1000, 260);
        ctx.fillStyle="#000"; ctx.font="900 48px system-ui";
        const words = output.split(' ');
        const idx = Math.floor((frame/total)*words.length);
        const chunk = words.slice(idx, idx+8).join(' ');
        ctx.fillText(chunk.substring(0,32), 540, 1200, 900);
        ctx.font="700 40px system-ui"; ctx.fillText(words.slice(idx+8, idx+16).join(' ').substring(0,32), 540, 1270, 900);

        ctx.fillStyle=colors; ctx.font="800 28px system-ui"; ctx.fillText("AUTONOMOUS ULTRA X", 540, 1400);

        frame++;
        if(frame < total && window.speechSynthesis.speaking || frame < total*0.8){
          requestAnimationFrame(draw);
        } else {
          recorder.stop();
          window.speechSynthesis.cancel();
        }
      };
      draw();

      setTimeout(()=>{ if(recorder.state==='recording') recorder.stop(); }, 13000);

    }catch(err:any){ alert("Error: "+err.message); setStatus("Error: "+err.message) }
  }

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16,fontFamily:"system-ui"}}>
      <h1>⚡ ULTRA X V3.1 FIXED</h1>
      <p style={{color:"#0F8"}}>Mobile Fixed - No external images</p>
      <select value={avatar} onChange={e=>setAvatar(parseInt(e.target.value))} style={{width:"100%",padding:12,borderRadius:12,background:"#111",color:"#fff"}}>
        {AVATARS.map((a,i)=><option key={i} value={i}>{a.name}</option>)}
      </select>
      <button onClick={genHook} style={{width:"100%",padding:14,background:"#00FF88",color:"#000",fontWeight:900,borderRadius:12,marginTop:8}}>🧠 GENERATE VIRAL HOOK</button>
      <textarea value={output} onChange={e=>setOutput(e.target.value)} style={{width:"100%",height:110,background:"#111",color:"#fff",borderRadius:12,padding:10,marginTop:8}}/>
      <button onClick={genVideo} style={{width:"100%",padding:18,background:"#FF0055",color:"#fff",fontWeight:900,borderRadius:14,fontSize:20,marginTop:10}}>🎬 GENERATE TALKING AVATAR VIDEO</button>
      <p style={{color:"#0F8",fontWeight:700}}>{status}</p>
      <canvas ref={canvasRef} width={1080} height={1920} style={{width:"100%",borderRadius:20,background:"#111",marginTop:10}}/>
    </div>
  )
}
