<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AUTONOMOUS ULTRA X - V2 VIDEO FACTORY</title>
<style>
body{background:#000;color:#fff;font-family:system-ui;padding:20px}
button{background:#fff;color:#000;border:none;padding:15px 25px;font-weight:900;border-radius:12px;margin:5px;cursor:pointer;width:100%}
canvas{width:100%;border-radius:20px;background:#111;margin-top:20px}
.tab{background:#111;color:#666}
.tab.active{background:#fff;color:#000}
#script{width:100%;height:80px;background:#111;color:#fff;border:1px solid #333;border-radius:12px;padding:15px;margin:10px 0}
</style>
</head>
<body>
<h1>⚡ AUTONOMOUS ULTRA X V2</h1>
<p>AI Video Factory - Limpopo Edition</p>

<textarea id="script">Tell a story about a broke student who built an AI empire in his bedroom in South Africa</textarea>

<div style="display:flex;gap:5px">
<button class="tab active" onclick="setMode('story')">STORY</button>
<button class="tab" onclick="setMode('hooks')">HOOKS</button>
<button class="tab" onclick="setMode('monet')">💰 MONEY</button>
</div>

<button onclick="generate()" style="background:#00FF88;font-size:18px">🧠 GENERATE VIRAL SCRIPT</button>
<div id="output" style="background:#111;padding:15px;border-radius:12px;margin:10px 0;min-height:100px;white-space:pre-wrap">Output will appear here...</div>

<button onclick="speak()" style="background:#444;color:#fff">🔊 PLAY 3AM VOICEOVER</button>
<button onclick="generateVideo()" style="background:#FF0055;color:#fff;font-size:20px">🎬 GENERATE STUNNING VIDEO (AUTONOMOUS)</button>

<canvas id="c" width="1080" height="1920"></canvas>
<p id="status"></p>
<button id="dl" style="display:none;background:#00F5FF" onclick="download()">⬇️ DOWNLOAD MP4 READY FOR TIKTOK</button>

<script>
let viralScript = "";
let mode = "story";
let recordedBlob = null;
let recorder;

function setMode(m){
 mode=m;
 document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
 event.target.classList.add('active');
}

function generate(){
 const input = document.getElementById('script').value;
 const out = document.getElementById('output');
 if(mode==='story'){
   viralScript = `[HOOK 0-3s]: I was BROKE in my bedroom in South Africa.\n\n[CONFLICT]: I tried dropshipping. I tried trading. Nothing worked. My friends laughed.\n\n[DISCOVERY]: At 3AM, I found AUTONOMOUS ULTRA X. An AI that writes viral content while I sleep.\n\n[RESULT]: First night: ${Math.floor(Math.random()*900)+100} views. Week 1: $847. Now it's printing money.\n\n[CTA]: Link in bio before they delete this.`;
 } else if(mode==='hooks'){
   viralScript = `HOOK 1: Broke student in Limpopo makes R300k/mo (here's how)\nHOOK 2: I built an AI empire from my bedroom\nHOOK 3: They laughed when I coded at 3AM, now they ask for jobs`;
 } else {
   viralScript = `STREAM 1: Affiliate - AI tools ($30/mo recurring)\nSTREAM 2: Digital Product - Prompt Pack $27\nSTREAM 3: Service - Setup $500\n\nMATH:\n10k views = 100 clicks = 5 sales x $27 = $135\n+ 2 affiliates x $30/mo = $60/mo recurring\nTOTAL: $195 per video\n\nSCALE: 3 videos/day = $17k/mo`;
 }
 out.innerText = viralScript;
}

function speak(){
 const u = new SpeechSynthesisUtterance(viralScript);
 u.rate = 0.9; u.pitch = 0.7;
 speechSynthesis.speak(u);
}

async function generateVideo(){
 const canvas = document.getElementById('c');
 const ctx = canvas.getContext('2d');
 const status = document.getElementById('status');
 status.innerText = "🎬 AUTONOMOUS RENDERING... Please wait 15 seconds";

 // Setup recorder
 const stream = canvas.captureStream(30);
 recorder = new MediaRecorder(stream, {mimeType: 'video/webm'});
 let chunks = [];
 recorder.ondataavailable = e => chunks.push(e.data);
 recorder.onstop = ()=>{
   recordedBlob = new Blob(chunks, {type: 'video/webm'});
   document.getElementById('dl').style.display='block';
   status.innerText = "✅ VIDEO READY! Click DOWNLOAD";
 };
 recorder.start();

 const lines = viralScript.split('\n');
 let frame = 0;
 const totalFrames = 30 * 12; // 12 sec video

 function draw(){
   // Background gradient - stunning
   const grad = ctx.createLinearGradient(0,0,0,1920);
   grad.addColorStop(0, `hsl(${260+Math.sin(frame/50)*20},100%,10%)`);
   grad.addColorStop(1, `hsl(${280},100%,5%)`);
   ctx.fillStyle = grad;
   ctx.fillRect(0,0,1080,1920);

   // Glow box
   ctx.fillStyle = "rgba(255,255,255,0.05)";
   ctx.fillRect(50, 200, 980, 1400);

   // Text
   ctx.fillStyle = "#fff";
   ctx.font = "900 70px system-ui";
   ctx.textAlign = "center";
   const progress = frame / totalFrames;
   const lineIndex = Math.floor(progress * lines.length);
   const currentLine = lines[lineIndex] || "";

   // Word wrap
   const words = currentLine.split(' ');
   let y = 600;
   let line = "";
   for(let n=0; n<words.length; n++){
     let test = line + words[n] + " ";
     if(ctx.measureText(test).width > 900){
       ctx.fillText(line, 540, y);
       y+=90;
       line = words[n] + " ";
     } else line = test;
   }
   ctx.fillText(line, 540, y);

   // Subtitle style
   ctx.font = "700 30px system-ui";
   ctx.fillStyle = "#00FF88";
   ctx.fillText("AUTONOMOUS ULTRA X - MAKHUDUTHAMAGA", 540, 1800);

   frame++;
   if(frame < totalFrames){
     requestAnimationFrame(draw);
   } else {
     recorder.stop();
   }
 }
 draw();
}

function download(){
 const url = URL.createObjectURL(recordedBlob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `viral-video-${Date.now()}.webm`;
 a.click();
}
</script>
</body>
</html>
