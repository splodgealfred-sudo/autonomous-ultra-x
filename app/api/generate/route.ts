import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, pillar } = await req.json();

  const demos: any = {
    HOOKS: `🔥 VIRAL HOOKS FOR: "${prompt}"\n\nHOOK 1 (Shock):\n"Stop. This AI just made me unemployed... and rich."\n\nHOOK 2 (Curiosity):\n"I told AI to steal my 9-5 and it did this in 47 seconds"\n\nHOOK 3 (POV):\n"POV: It's 2026 and AI does your job while you sleep"\n\nCTA: "Comment 'X' and I send you the exact prompt"`,

    STORY: `📖 STORY ARC FOR: "${prompt}"\n\n1. HOOK (0-3s): Show the problem - "I was broke"\n2. CONFLICT (3-8s): Tried everything, failed\n3. DISCOVERY (8-12s): Found AUTONOMOUS ULTRA X\n4. RESULT (12-15s): $847 in 24h\n5. CTA: "Link in bio - before they delete this"\n\nB-ROLL: screen record + money screenshot`,

    VIRALITY: `🚀 VIRALITY ENGINE FOR: "${prompt}"\n\nFORMULA:\n- Text overlay: Big bold CAPS first 1s\n- Pattern interrupt every 2s\n- Music: Trending TikTok phonk\n- Captions: Auto-captions 90% watch muted\n- Hashtags: #ai #autonomous #sidehustle #fyp #aivideo\n\nPOST TIMES: 7am, 12pm, 8pm SAST`,

    MONETIZATION: `💰 MONETIZATION FOR: "${prompt}"\n\nSTREAM 1: Affiliate - AI tools ($30/mo recurring)\nSTREAM 2: Digital Product - Prompt Pack $27\nSTREAM 3: Service - Setup $500\n\nMATH:\n10k views = 100 clicks = 5 sales x $27 = $135\n+ 2 affiliates x $30/mo = $60/mo recurring\nTOTAL: $195 per video\n\nSCALE: 3 videos/day = $17k/mo`
  };

  await new Promise(r => setTimeout(r, 1200));

  return NextResponse.json({
    script: demos[pillar] || demos.HOOKS,
    pillar,
    prompt
  });
}
