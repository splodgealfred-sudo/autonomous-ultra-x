"use client";
import { useState, useRef } from "react";

export default function Page(){
  const [script, setScript] = useState("I was broke in Makhuduthamaga, Limpopo. Everyone laughed when I coded at 3AM. Now my AI twin makes videos while I sleep. Link in bio before they delete this.");
  const [face, setFace] = useState<string | null>(null);
  const [status, setStatus] = useState("👇 Upload your face first");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleUpload = (e:any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => { setFace(reader.result as string); setStatus("✅ Face loaded! Now generate viral video") };
    reader.readAsDataURL(file);
  }

  const viralHooks = [
    "I was BROKE in Makhuduthamaga. No job. My mom said stop playing with computer. At 3AM I built an AI that hires people to talk for me. First night 847 views. Now it prints while I sleep.",
    "POV: You live in Limpopo and your AI clone makes more money than your lecturer. No camera. No editing. Just code. Link in bio.",
    "They said Alfred you will never make it with AI. Now they ask me for jobs. I built a factory where my face talks 24/7 in English, Sepedi and Zulu.",
  ];

  const generateVideo = async () => {
    if(!face){ alert("Upload your face first bro!"); return; }
    try{
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const avatar = new Image();
      avatar.src = face;
      await new Promise(r=> avatar.onload = r);

      setStatus("🎬 DIRECTING YOUR AI TWIN...");
      const stream = canvas.captureStream(30);
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')? 'video/webm;codecs=vp9' : 'video/webm';
      const rec = new MediaRecorder(stream, {mimeType: mime});
      let chunks:Blob[]=[]; rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
      rec.onstop=()=>{
        const blob = new Blob(chunks, {type:mime});
        const url = URL.createObjectURL(blob);
        const a=document.createElement('a'); a.href=url; a.download=`FINAL-ULTRA-X-${Date.now()}.webm`; a.click();
        setStatus("✅ FINAL VIDEO DOWNLOADED! Post to TikTok now! 🔥");
      };
      rec.start(100);

      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(script);
      u.rate=0.92; u.pitch=0.9; u.volume=1;
      speechSynthesis.speak(u);

      let frame=0; const total=30*14;
      let audioLevel=0;

      const draw=()=>{
        // Background studio
        const grad = ctx.createLinearGradient(0,0,0,1920);
        grad.addColorStop(0,"#0a0a0a"); grad.addColorStop(1,"#1a0033");
        ctx.fillStyle=grad; ctx.fillRect(0,0,1080,1920);

        // Blurred face background
        ctx.globalAlpha=0.15; ctx.drawImage(avatar, 0,0,1080,1920); ctx.globalAlpha=1;

        // Main face - talking effect
        const isTalking = speechSynthesis.speaking;
        // Realistic mouth: stretch lower 30% of face
        const mouthOpen = isTalking? (Math.abs(Math.sin(frame/2.5))*22 + Math.sin(frame/1.2)*6 + 8) : 0;

        ctx.save();
        ctx.beginPath(); ctx.arc(540, 680, 310, 0, Math.PI*2); ctx.clip();
        // Draw full face
        ctx.drawImage(avatar, 230, 370, 620, 620);
        // Draw mouth overlay stretched
        if(isTalking){
          // lower face stretch for lip-sync illusion
          ctx.drawImage(avatar,
            avatar.width*0.28, avatar.height*0.62, avatar.width*0.44, avatar.height*0.22,
            340, 820, 400, 110 + mouthOpen
          );
        }
        ctx.restore();

        // Neon border
        ctx.strokeStyle="#00FF88"; ctx.lineWidth=10; ctx.shadowColor="#00FF88"; ctx.shadowBlur=20;
        ctx.beginPath(); ctx.arc(540,680,315,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0;

        // Subtitles - viral style
        ctx.fillStyle="#fff"; ctx.textAlign="center";
        const words = script.split(' '); const idx=Math.floor((frame/total)*words.length);
        const line1 = words.slice(idx, idx+6).join(' ');
        const line2 = words.slice(idx+6, idx+12).join(' ');

        ctx.fillStyle="rgba(0,0,0,0.85)"; ctx.fillRect(30, 1150, 1020, 320);
        ctx.fillStyle="#fff"; ctx.font="900 52px system-ui"; ctx.fillText(line1,540,1240,950);
        ctx.font="900 52px system-ui"; ctx.fillStyle="#00FF88"; ctx.fillText(line2,540,1310,950);

        ctx.font="800 24px system-ui"; ctx.fillStyle="#888"; ctx.fillText("AUTONOMOUS ULTRA X • FINAL",540,1450);

        frame++;
        if(frame < total) requestAnimationFrame(draw);
        else rec.stop();
      };
      draw();
      setTimeout(()=>{ if(rec.state==='recording') rec.stop(); speechSynthesis.cancel(); }, 14500);

    }catch(e:any){ setStatus("Error: "+e.message) }
  }

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:16,fontFamily:"system-ui"}}>
      <h1>⚡ ULTRA X V4 FINAL</h1>
      <p style={{color:"#00FF88",fontSize:13}}>REAL TALKING PEOPLE • FINAL VERSION</p>

      <div style={{background:"#111",padding:12,borderRadius:12,marginTop:10,border:"2px dashed #00FF88"}}>
        <p>📸 Step 1: Upload YOUR Face</p>
        <input type="file" accept="image/*" onChange={handleUpload} style={{width:"100%",color:"#fff"}} />
        {face && <img src={face} style={{width:80,height:80,borderRadius:40,marginTop:8,objectFit:"cover",border:"3px solid #00FF88"}} />}
      </div>

      <button onClick={()=>setScript(viralHooks[Math.floor(Math.random()*3)])} style={{width:"100%",padding:12,background:"#222",color:"#fff",borderRadius:12,marginTop:10}}>🎲 RANDOM VIRAL HOOK</button>
      <textarea value={script} onChange={e=>setScript(e.target.value)} style={{width:"100%",height:120,background:"#111",color:"#fff",borderRadius:12,padding:12,marginTop:8}} />

      <button onClick={generateVideo} style={{width:"100%",padding:18,background:"#00FF88",color:"#000",fontWeight:900,fontSize:20,borderRadius:14,marginTop:10}}>🎬 GENERATE FINAL TALKING VIDEO</button>
      <p style={{color:"#00FF88",fontWeight:700,marginTop:8}}>{status}</p>
      <canvas ref={canvasRef} width={1080} height={1920} style={{width:"100%",borderRadius:20,background:"#0a0a0a",marginTop:8}} />
      <p style={{color:"#555",fontSize:11,marginTop:10}}>FINAL: Your real face talks. Upload front-facing photo. No sunglasses. Good light. This is what goes viral in 2026.</p>
    </div>
  )
}
