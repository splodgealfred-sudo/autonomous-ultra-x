"use client";
import { useState, useRef, useEffect } from "react";
export default function Page(){
  const [script, setScript] = useState("I was broke in Makhuduthamaga, Limpopo. Everyone laughed when I coded at 3AM. Now my AI twin talks while I sleep. Link in bio.");
  const [face, setFace] = useState<string|null>(null);
  const [status, setStatus] = useState("Upload face");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(()=>{ const l=()=>{ if(speechSynthesis.getVoices().length>0) setReady(true); }; l(); speechSynthesis.onvoiceschanged=l; },[]);
  const onFile=(e:any)=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ setFace(r.result as string); setStatus("✅ Face loaded"); }; r.readAsDataURL(f); };
  const gen=async()=>{
    if(!face) return alert("Upload face");
    const canvas=canvasRef.current!; const ctx=canvas.getContext("2d")!;
    const img=new Image(); img.src=face; await new Promise(r=>img.onload=r as any);
    setStatus("🎬 Talking...");
    const stream=canvas.captureStream(30);
    const rec=new MediaRecorder(stream,{mimeType:'video/webm'}); let ch:Blob[]=[]; rec.ondataavailable=e=>e.data.size&&ch.push(e.data);
    rec.onstop=()=>{ const b=new Blob(ch,{type:'video/webm'}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=`ULTRA-X-PERFECT-${Date.now()}.webm`; a.click(); setStatus("✅ PERFECT VIDEO SAVED!"); };
    rec.start(100);
    speechSynthesis.cancel(); const ut=new SpeechSynthesisUtterance(script); ut.rate=0.9; ut.volume=1;
    const vs=speechSynthesis.getVoices(); if(vs.length) ut.voice=vs.find(v=>v.lang.includes('en'))||vs[0]; speechSynthesis.speak(ut);
    let fr=0; const total=30*13;
    const draw=()=>{
      ctx.fillStyle="#000"; ctx.fillRect(0,0,1080,1920);
      ctx.drawImage(img,0,0,1080,1920); // full face background blurred slightly
      // face circle clean
      ctx.save(); ctx.beginPath(); ctx.arc(540,650,320,0,Math.PI*2); ctx.clip();
      ctx.drawImage(img, 180, 250, 720, 720);
      // PERFECT MOUTH - draw realistic mouth instead of slicing
      const talking=speechSynthesis.speaking;
      if(talking){
        const open = Math.abs(Math.sin(fr/2.8))*28 + Math.abs(Math.sin(fr/3.5))*12 + 6;
        // mouth position (estimate lower face)
        const mx=540, my=860;
        ctx.fillStyle="#120000"; // inside mouth dark
        ctx.beginPath(); ctx.ellipse(mx, my, 55, open, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle="#fff"; // teeth
        ctx.beginPath(); ctx.ellipse(mx, my-8, 40, Math.min(open*0.5,10), 0,0,Math.PI*2); ctx.fill();
        ctx.fillStyle="#a00"; // tongue
        if(open>15){ ctx.beginPath(); ctx.ellipse(mx, my+8, 25, 8, 0,0,Math.PI*2); ctx.fill(); }
      }
      ctx.restore();
      ctx.strokeStyle="#00FF88"; ctx.lineWidth=12; ctx.shadowColor="#00FF88"; ctx.shadowBlur=20; ctx.beginPath(); ctx.arc(540,650,328,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0;
      const w=script.split(' '); const i=Math.floor((fr/total)*w.length);
      ctx.fillStyle="rgba(0,0,0,0.9)"; ctx.fillRect(20,1150,1040,300);
      ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font="900 48px system-ui"; ctx.fillText(w.slice(i,i+6).join(' '),540,1230,950);
      ctx.fillStyle="#00FF88"; ctx.fillText(w.slice(i+6,i+12).join(' '),540,1305,950);
      fr++; if(fr<total) requestAnimationFrame(draw); else { rec.stop(); speechSynthesis.cancel(); }
    }; draw();
    setTimeout(()=>{ if(rec.state==='recording') rec.stop(); },13500);
  };
  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:14,fontFamily:"system-ui"}}>
      <h2>⚡ V4.2 PERFECT MOUTH</h2>
      <p style={{color:ready?"#0F8":"#F55",fontSize:12}}>{ready?"🔊 Voice Ready":"Loading voice"}</p>
      <input type="file" accept="image/*" onChange={onFile} style={{width:"100%"}}/>
      {face&&<img src={face} style={{width:70,height:70,borderRadius:35,objectFit:"cover",border:"2px solid #0F8"}}/>}
      <textarea value={script} onChange={e=>setScript(e.target.value)} style={{width:"100%",height:90,background:"#111",color:"#fff",borderRadius:12,padding:10,marginTop:8}}/>
      <button onClick={gen} style={{width:"100%",padding:16,background:"#00FF88",color:"#000",fontWeight:900,fontSize:19,borderRadius:14,marginTop:8}}>🎬 GENERATE PERFECT TALKING VIDEO</button>
      <p style={{color:"#0F8",fontWeight:700}}>{status}</p>
      <canvas ref={canvasRef} width={1080} height={1920} style={{width:"100%",borderRadius:20,background:"#111"}}/>
    </div>
  )
}
