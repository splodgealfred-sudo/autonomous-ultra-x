import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] -top-20" />

      <div className="z-10 flex flex-col items-center">
        <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-7xl font-black shadow-[0_0_80px_rgba(34,211,238,0.5)]">
          X
        </div>
        <h1 className="mt-8 text-3xl tracking-[0.4em] font-black">AUTONOMOUS ULTRA X</h1>
        <p className="text-cyan-400 tracking-[0.3em] text-sm mt-3">AI VIDEO STUDIO • PRIVATE BUILD</p>

        <Link href="/studio" className="mt-10 px-12 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-cyan-400 hover:scale-105 transition-all">
          ENTER STUDIO →
        </Link>

        <p className="mt-6 text-zinc-500 text-xs tracking-widest">MISSION: 1M FOLLOWERS • 4 PILLARS SYSTEM</p>
      </div>
    </main>
  );
}
