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

/* PARTICLES */
const canvas = document.getElementById("premiumCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars=[];
for(let i=0;i<150;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2,
    speed:Math.random()*0.5
  });
}

function animate(){
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="gold";
  stars.forEach(s=>{
    s.y+=s.speed;
    if(s.y>canvas.height){
      s.y=0;
      s.x=Math.random()*canvas.width;
    }
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* SNAKE EFFECT */
document.querySelectorAll(".golden").forEach(canvas=>{
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let angle=0;

  function snake(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let cx = canvas.width/2;
    let cy = canvas.height/2;

    for(let i=0;i<100;i++){
      let x = cx + Math.cos(angle+i*0.1)*200;
      let y = cy + Math.sin(angle+i*0.1)*200;

      ctx.beginPath();
      ctx.fillStyle="gold";
      ctx.arc(x,y,3,0,Math.PI*2);
      ctx.fill();
    }

    angle+=0.02;
    requestAnimationFrame(snake);
  }

  snake();
});