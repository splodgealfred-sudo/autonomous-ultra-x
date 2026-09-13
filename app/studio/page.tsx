"use client";
import { useState } from "react";
const PILLARS = ["HOOKS","STORY","VIRALITY","MONETIZATION"];
export default function Studio(){
  const [prompt,setPrompt]=useState("Tell a story about a broke student who built an AI empire in his bedroom in South Africa");
  const [pillar,setPillar]=useState("STORY");
  const [loading,setLoading]=useState(false);
  const [output,setOutput]=useState("");
  const [speaking,setSpeaking]=useState(false);
  const generate=async()=>{
    if(!prompt) return alert("Enter prompt");
    setLoading(true); setOutput("");
    const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,pillar})});
    const data=await res.json(); setOutput(data.script); setLoading(false);
  };
  const speak=()=>{
    if(!output) return;
    setSpeaking(true);
    const u=new SpeechSynthesisUtterance(output);
    u.rate=1.1; u.pitch=1; u.onend=()=>setSpeaking(false);
    speechSynthesis.speak(u);
  };
  return(
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black tracking-[0.3em]">STUDIO <span className="text-cyan-400">X</span> <span className="text-xs font-normal tracking-widest text-zinc-500">VOICE ACTIVE</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="grid grid-cols-2 gap-2">
              {PILLARS.map(p=><button key={p} onClick={()=>setPillar(p)} className={`p-3 rounded-xl text-xs font-bold tracking-widest border ${pillar===p?'bg-cyan-400 text-black border-cyan-400':'bg-black border-zinc-800 text-zinc-400'}`}>{p}</button>)}
            </div>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full mt-6 h-32 bg-black border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-cyan-400"/>
            <button onClick={generate} disabled={loading} className="w-full mt-6 py-4 bg-white text-black rounded-full font-black tracking-widest hover:bg-cyan-400 disabled:opacity-50">{loading?"GENERATING...":"GENERATE →"}</button>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 min-h-[400px]">
            {!output&&!loading&&<p className="text-zinc-600 text-xs tracking-widest text-center mt-20">Click GENERATE</p>}
            {loading&&<div className="flex justify-center mt-20"><div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"/></div>}
            {output&&<><pre className="whitespace-pre-wrap text-sm bg-black p-4 rounded-xl border border-zinc-800 w-full text-cyan-100 leading-relaxed">{output}</pre>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={speak} className={`py-3 rounded-full text-xs font-bold ${speaking?'bg-red-500 text-white':'bg-cyan-400 text-black'}`}>{speaking?'🔊 SPEAKING...':'🔊 PLAY VOICEOVER'}</button>
              <button onClick={()=>{speechSynthesis.cancel(); setSpeaking(false);}} className="py-3 bg-zinc-800 rounded-full text-xs">STOP</button>
            </div>
            <button onClick={()=>navigator.clipboard.writeText(output)} className="w-full mt-2 py-2 bg-white text-black rounded-full text-xs font-bold">COPY SCRIPT</button></>}
          </div>
        </div>
        <a href="/" className="text-xs text-zinc-500 mt-8 inline-block">← HOME</a>
      </div>
    </main>
  );
}
