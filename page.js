/* TYPING */
const text = "Welcome to My Portfolio";
let i = 0;

function typing(){
  if(i < text.length){
    document.getElementById("typingText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing,50);
  }
}
typing();

/* NAVIGATION */
function showSection(id){
  document.querySelector(".hero").style.display="none";
  document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goHome(){
  document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
  document.querySelector(".hero").style.display="flex";
}

/* CURSOR GLOW */
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove",(e)=>{
  glow.style.left = e.clientX+"px";
  glow.style.top = e.clientY+"px";
});

/* ============================================================
   HERO BACKGROUND — PREMIUM AI NEURAL COSMOS ANIMATION
   Layers:
   1. Deep space gradient base (CSS on canvas bg)
   2. Drifting nebula clouds (soft radial blobs)
   3. Star field (twinkling + pulsing)
   4. Neural network nodes connected by glowing edges
   5. Shooting stars / comets
   6. Subtle aurora wave at bottom
   ============================================================ */

const canvas = document.getElementById("premiumCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* --- STARS --- */
const STAR_COUNT = 220;
let stars = [];
function initStars(){
  stars = [];
  for(let i=0;i<STAR_COUNT;i++){
    stars.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*1.8+0.2,
      baseAlpha: Math.random()*0.7+0.3,
      alpha: 0,
      twinkleSpeed: Math.random()*0.02+0.005,
      twinkleOffset: Math.random()*Math.PI*2,
      drift: (Math.random()-0.5)*0.05
    });
  }
}
initStars();

/* --- NEBULA BLOBS --- */
const NEBULA_COUNT = 6;
let nebulae = [];
function initNebulae(){
  nebulae = [];
  const colors = [
    "rgba(80,20,160,",
    "rgba(0,60,140,",
    "rgba(160,40,80,",
    "rgba(0,120,100,",
    "rgba(100,0,180,",
    "rgba(20,80,160,"
  ];
  for(let i=0;i<NEBULA_COUNT;i++){
    nebulae.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*280+150,
      color: colors[i%colors.length],
      alpha: Math.random()*0.12+0.04,
      dx: (Math.random()-0.5)*0.15,
      dy: (Math.random()-0.5)*0.1
    });
  }
}
initNebulae();

/* --- NEURAL NODES --- */
const NODE_COUNT = 55;
let nodes = [];
function initNodes(){
  nodes = [];
  for(let i=0;i<NODE_COUNT;i++){
    nodes.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      size: Math.random()*2.5+1,
      pulse: Math.random()*Math.PI*2,
      pulseSpeed: Math.random()*0.03+0.01,
      color: Math.random()<0.5 ? "gold" : (Math.random()<0.5 ? "#00cfff" : "#ff6fff")
    });
  }
}
initNodes();

/* --- SHOOTING STARS --- */
let shooters = [];
function spawnShooter(){
  shooters.push({
    x: Math.random()*canvas.width*1.2,
    y: Math.random()*canvas.height*0.5,
    len: Math.random()*180+80,
    speed: Math.random()*8+5,
    alpha: 1,
    angle: Math.PI/5 + (Math.random()-0.5)*0.3,
    life: 1
  });
}
setInterval(spawnShooter, 2200);

/* --- AURORA --- */
let auroraT = 0;

/* --- MOUSE PARALLAX --- */
let mouseX = canvas.width/2, mouseY = canvas.height/2;
window.addEventListener("mousemove",(e)=>{ mouseX=e.clientX; mouseY=e.clientY; });

let frame = 0;

function drawBackground(){
  /* Deep space gradient */
  const grad = ctx.createRadialGradient(
    canvas.width/2, canvas.height/2, 0,
    canvas.width/2, canvas.height/2, canvas.width*0.9
  );
  grad.addColorStop(0,"#0a001a");
  grad.addColorStop(0.5,"#020010");
  grad.addColorStop(1,"#000005");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawNebulae(){
  nebulae.forEach(n=>{
    /* Slow drift with mouse parallax */
    n.x += n.dx + (mouseX - canvas.width/2)*0.00008;
    n.y += n.dy + (mouseY - canvas.height/2)*0.00006;
    if(n.x < -n.r) n.x = canvas.width+n.r;
    if(n.x > canvas.width+n.r) n.x = -n.r;
    if(n.y < -n.r) n.y = canvas.height+n.r;
    if(n.y > canvas.height+n.r) n.y = -n.r;

    const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
    g.addColorStop(0, n.color+(n.alpha)+")");
    g.addColorStop(0.5, n.color+(n.alpha*0.4)+")");
    g.addColorStop(1, n.color+"0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
    ctx.fill();
  });
}

function drawStars(){
  const t = frame*0.016;
  stars.forEach(s=>{
    s.x += s.drift;
    if(s.x > canvas.width) s.x = 0;
    if(s.x < 0) s.x = canvas.width;

    s.alpha = s.baseAlpha * (0.5 + 0.5*Math.sin(t*s.twinkleSpeed*60 + s.twinkleOffset));

    /* Glow */
    const sg = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.size*4);
    sg.addColorStop(0,`rgba(255,255,255,${s.alpha})`);
    sg.addColorStop(0.3,`rgba(200,220,255,${s.alpha*0.5})`);
    sg.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size*4,0,Math.PI*2);
    ctx.fill();

    /* Core dot */
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fill();
  });
}

function drawNeural(){
  const CONNECTION_DIST = 140;
  /* Move nodes */
  nodes.forEach(n=>{
    n.x += n.vx;
    n.y += n.vy;
    if(n.x<0||n.x>canvas.width) n.vx*=-1;
    if(n.y<0||n.y>canvas.height) n.vy*=-1;
    n.pulse += n.pulseSpeed;
  });

  /* Draw edges */
  for(let a=0;a<nodes.length;a++){
    for(let b=a+1;b<nodes.length;b++){
      const dx = nodes[a].x - nodes[b].x;
      const dy = nodes[a].y - nodes[b].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < CONNECTION_DIST){
        const alpha = (1 - dist/CONNECTION_DIST)*0.45;

        /* Gradient edge */
        const eg = ctx.createLinearGradient(nodes[a].x,nodes[a].y,nodes[b].x,nodes[b].y);
        eg.addColorStop(0, colorWithAlpha(nodes[a].color, alpha));
        eg.addColorStop(1, colorWithAlpha(nodes[b].color, alpha));

        ctx.strokeStyle = eg;
        ctx.lineWidth = (1-dist/CONNECTION_DIST)*1.5;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x,nodes[a].y);
        ctx.lineTo(nodes[b].x,nodes[b].y);
        ctx.stroke();

        /* Data pulse traveling along edge */
        if(Math.random()<0.002){
          const px = nodes[a].x + (nodes[b].x - nodes[a].x)*((frame%80)/80);
          const py = nodes[a].y + (nodes[b].y - nodes[a].y)*((frame%80)/80);
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.beginPath();
          ctx.arc(px,py,2,0,Math.PI*2);
          ctx.fill();
        }
      }
    }
  }

  /* Draw nodes */
  nodes.forEach(n=>{
    const pulse = 0.5+0.5*Math.sin(n.pulse);
    const r = n.size + pulse*3;

    /* Outer glow */
    const ng = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*5);
    ng.addColorStop(0, colorWithAlpha(n.color, 0.6*pulse));
    ng.addColorStop(1, colorWithAlpha(n.color, 0));
    ctx.fillStyle = ng;
    ctx.beginPath();
    ctx.arc(n.x,n.y,r*5,0,Math.PI*2);
    ctx.fill();

    /* Core */
    ctx.fillStyle = n.color;
    ctx.beginPath();
    ctx.arc(n.x,n.y,r,0,Math.PI*2);
    ctx.fill();
  });
}

function colorWithAlpha(colorName, alpha){
  if(colorName==="gold") return `rgba(255,215,0,${alpha})`;
  if(colorName==="#00cfff") return `rgba(0,207,255,${alpha})`;
  return `rgba(255,111,255,${alpha})`;
}

function drawShooters(){
  shooters = shooters.filter(s=>s.life>0);
  shooters.forEach(s=>{
    s.x += Math.cos(s.angle)*s.speed;
    s.y += Math.sin(s.angle)*s.speed;
    s.life -= 0.018;
    s.alpha = s.life;

    const tail = {
      x: s.x - Math.cos(s.angle)*s.len,
      y: s.y - Math.sin(s.angle)*s.len
    };
    const sg = ctx.createLinearGradient(tail.x,tail.y,s.x,s.y);
    sg.addColorStop(0,"rgba(255,255,255,0)");
    sg.addColorStop(0.7,`rgba(200,230,255,${s.alpha*0.4})`);
    sg.addColorStop(1,`rgba(255,255,255,${s.alpha})`);

    ctx.strokeStyle = sg;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tail.x,tail.y);
    ctx.lineTo(s.x,s.y);
    ctx.stroke();

    /* Bright tip */
    const tg = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,8);
    tg.addColorStop(0,`rgba(255,255,255,${s.alpha})`);
    tg.addColorStop(1,"rgba(255,255,255,0)");
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.arc(s.x,s.y,8,0,Math.PI*2);
    ctx.fill();
  });
}

function drawAurora(){
  auroraT += 0.004;
  const y = canvas.height;
  const colors = [
    [0,255,150],
    [0,180,255],
    [180,0,255]
  ];

  for(let c=0;c<colors.length;c++){
    ctx.beginPath();
    ctx.moveTo(0,y);
    const segments = 12;
    for(let j=0;j<=segments;j++){
      const xp = (j/segments)*canvas.width;
      const wave1 = Math.sin(auroraT + j*0.5 + c)*60;
      const wave2 = Math.sin(auroraT*1.3 + j*0.8 + c*2)*40;
      const yp = y - 120 - wave1 - wave2;
      if(j===0) ctx.moveTo(xp, y);
      ctx.lineTo(xp, yp);
    }
    ctx.lineTo(canvas.width, y);
    ctx.closePath();

    const ag = ctx.createLinearGradient(0,y-200,0,y);
    const [r,g,b] = colors[c];
    ag.addColorStop(0,`rgba(${r},${g},${b},0)`);
    ag.addColorStop(0.6,`rgba(${r},${g},${b},0.04)`);
    ag.addColorStop(1,`rgba(${r},${g},${b},0.12)`);
    ctx.fillStyle = ag;
    ctx.fill();
  }
}

function animate(){
  frame++;
  drawBackground();
  drawNebulae();
  drawAurora();
  drawStars();
  drawNeural();
  drawShooters();
  requestAnimationFrame(animate);
}
animate();

/* ============================================================
   SECTION BACKGROUNDS — GOLDEN SNAKE (unchanged behavior,
   upgraded visuals: thicker glow, color-shifted to gold+cyan)
   ============================================================ */
document.querySelectorAll(".golden").forEach(gc=>{
  const gctx = gc.getContext("2d");

  function resizeGolden(){
    gc.width = window.innerWidth;
    gc.height = window.innerHeight;
  }
  resizeGolden();
  window.addEventListener("resize", resizeGolden);

  let angle = 0;
  let hue = 45; /* starts gold */

  function snake(){
    gctx.clearRect(0,0,gc.width,gc.height);

    /* Dark base */
    gctx.fillStyle="rgba(0,0,0,0.85)";
    gctx.fillRect(0,0,gc.width,gc.height);

    const cx = gc.width/2;
    const cy = gc.height/2;
    hue += 0.1;

    for(let k=0;k<120;k++){
      const x = cx + Math.cos(angle+k*0.1)*220 + Math.sin(angle*0.7+k*0.05)*80;
      const y = cy + Math.sin(angle+k*0.1)*220 + Math.cos(angle*0.5+k*0.07)*60;

      const segHue = (hue + k*1.5)%360;
      const alpha = 0.5 + 0.5*Math.sin(angle + k*0.15);

      /* Glow layer */
      const sg = gctx.createRadialGradient(x,y,0,x,y,10);
      sg.addColorStop(0,`hsla(${segHue},100%,65%,${alpha*0.8})`);
      sg.addColorStop(1,`hsla(${segHue},100%,65%,0)`);
      gctx.fillStyle = sg;
      gctx.beginPath();
      gctx.arc(x,y,10,0,Math.PI*2);
      gctx.fill();

      /* Core dot */
      gctx.fillStyle = `hsla(${segHue},100%,80%,${alpha})`;
      gctx.beginPath();
      gctx.arc(x,y,3.5,0,Math.PI*2);
      gctx.fill();
    }

    /* Second intertwined snake offset */
    for(let k=0;k<80;k++){
      const x = cx + Math.cos(-angle*1.1+k*0.12)*160 + Math.sin(angle*0.9+k*0.08)*50;
      const y = cy + Math.sin(-angle*1.1+k*0.12)*160 + Math.cos(angle*0.6+k*0.1)*40;
      const segHue2 = (hue + k*2 + 180)%360;
      const alpha2 = 0.4 + 0.4*Math.sin(-angle + k*0.2);

      gctx.fillStyle = `hsla(${segHue2},100%,70%,${alpha2*0.6})`;
      gctx.beginPath();
      gctx.arc(x,y,2.5,0,Math.PI*2);
      gctx.fill();
    }

    angle += 0.018;
    requestAnimationFrame(snake);
  }
  snake();
});