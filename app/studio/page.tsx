"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [script, setScript] = useState("Tell a story about a broke student who built an AI empire in his bedroom in South Africa");
  const [output, setOutput] = useState("Output will appear here...");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");
  const [showDL, setShowDL] = useState(false);
  let recordedBlob: Blob | null = null;

  const generate = () => {
    const viral = `[HOOK 0-3s]: I was BROKE in my bedroom in SA.\n\n[CONFLICT]: I tried dropshipping. Trading. Nothing worked.\n\n[DISCOVERY]: At 3AM, I found AUTONOMOUS ULTRA X. AI that writes viral content while I sleep.\n\n[RESULT]: First night: ${Math.floor(Math.random()*900)+100} views. Week 1: $847. Now it's printing.\n\n[CTA]: Link in bio before they delete this.`;
    setOutput(viral);
  };

  const speak = () => {
    const u = new SpeechSynthesisUtterance(output);
    u.rate = 0.9; u.pitch = 0.7;
    speechSynthesis.speak(u);
  };

  const generateVideo = async () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    setStatus("🎬 AUTONOMOUS RENDERING... 12 sec");
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, {mimeType: 'video/webm'});
    let chunks: Blob[] = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      recordedBlob = new Blob(chunks, {type: 'video/webm'});
      (window as any).myBlob = recordedBlob;
      setShowDL(true);
      setStatus("✅ VIDEO READY! Download below");
    };
    recorder.start();
    const lines = output.split('\n');
    let frame = 0;
    const total = 30 * 12;
    const draw = () => {
      const grad = ctx.createLinearGradient(0,0,0,1920);
      grad.addColorStop(0, `hsl(${260+Math.sin(frame/50)*20},100%,10%)`);
      grad.addColorStop(1, `hsl(280,100%,5%)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,1080,1920);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(50,200,980,1400);
      ctx.fillStyle = "#fff";
      ctx.font = "900 60px system-ui";
      ctx.textAlign = "center";
      const idx = Math.floor((frame/total)*lines.length);
      ctx.fillText(lines[idx]?.substring(0,35) || "", 540, 800, 900);
      ctx.font = "700 26px system-ui";
      ctx.fillStyle = "#00FF88";
      ctx.fillText("AUTONOMOUS ULTRA X - MAKHUDUTHAMAGA", 540, 1800);
      frame++;
      if(frame < total) requestAnimationFrame(draw);
      else recorder.stop();
    };
    draw();
  };

  const download = () => {
    const blob = (window as any).myBlob;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `viral-${Date.now()}.webm`; a.click();
  };

  return (
    <div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:20,fontFamily:"system-ui"}}>
      <h1>⚡ AUTONOMOUS ULTRA X V2</h1>
      <textarea value={script} onChange={e=>setScript(e.target.value)} style={{width:"100%",height:80,background:"#111",color:"#fff",borderRadius:12,padding:15}} />
      <button onClick={generate} style={{width:"100%",padding:15,fontWeight:900,borderRadius:12,background:"#00FF88",marginTop:10}}>🧠 GENERATE VIRAL SCRIPT</button>
      <div style={{background:"#111",padding:15,borderRadius:12,margin:"10px 0",whiteSpace:"pre-wrap"}}>{output}</div>
      <button onClick={speak} style={{width:"100%",padding:12,borderRadius:12,background:"#333",color:"#fff"}}>🔊 PLAY 3AM VOICEOVER</button>
      <button onClick={generateVideo} style={{width:"100%",padding:15,borderRadius:12,background:"#FF0055",color:"#fff",fontWeight:900,fontSize:18,marginTop:10}}>🎬 GENERATE STUNNING VIDEO (AUTONOMOUS)</button>
      <canvas ref={canvasRef} width={1080} height={1920} style={{width:"100%",borderRadius:20,background:"#111",marginTop:20}} />
      <p>{status}</p>
      {showDL && <button onClick={download} style={{width:"100%",padding:15,borderRadius:12,background:"#00F5FF",fontWeight:900}}>⬇️ DOWNLOAD MP4 READY FOR TIKTOK</button>}
    </div>
  );
}
