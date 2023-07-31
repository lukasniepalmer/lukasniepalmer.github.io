const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const loadImage = (src) => new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => resolve(img);
});
var FI;
var raket;
var raketx;

window.addEventListener("keyup", ({ keyCode }) => {
    if (vh==keyCode ) {
     raketx=vx();   
     vh=56799876;   
    }
})
        var st=new Date();
function SF(params) {
    var v =[];
    for (let sm = 0; sm < 10; sm++) {
        for (let gf = 0; gf < 3+2*sm; gf++) {
           var fiende = {
               tid: new Date(),
               x: 1000+gf*100,
               y:-(10+gf*100+sm*1000) ,
               xfart:-0.2 ,
               yfart: 0.075,
           };
            v.push(fiende);
        }        
    }
        return v;
}
var fiender=SF();
window.addEventListener("keydown", ({ keyCode }) => {
    if(keyCode==vh){
        return;
    }
    raketx=vx();
    sekund=new Date();
    vh=keyCode;
})

var sekund;
var vh;
var rymd;
function vx(params) {
    var ms=new Date()-sekund;
    var p=1.0*ms;
    if (37==vh){
        return raketx-p; 
    }
    if (39==vh){
        return raketx+p;        
    }
    return raketx;
}

function rita(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // innerHeight - höjden på hela ytan
    // raket.naturalHeight - höjden på raketen

    // innerWidth - bredden på hela ytan
    // raket.naturalWidth - bredden på raketen
    
    var rakety=innerHeight-raket.naturalHeight;    
    if (vx()<0) {
        raketx=0;
        vh=1253246456468;
    }
     if (vx()>innerWidth-raket.naturalWidth) {
        raketx=innerWidth-raket.naturalWidth;
        vh=1253246456468;
    }
    
    var rb =rymd.naturalWidth;
    var rh=rymd.naturalHeight; 
    if (rb<innerWidth){
        rh *= innerWidth/rb;
        rb=innerWidth;
    }
    var flytt=-(new Date()-st)/10;
    var yStart = (Math.floor(flytt/rh) * rh) - flytt;
    for (let y = yStart; y<innerHeight; y=y+rh) {
        ctx.drawImage(rymd, 0,y, rb, rh);
    }
    ctx.drawImage(raket, vx(), rakety, raket.naturalWidth, raket.naturalHeight);
    var fb=FI.naturalWidth/5;
    var fh=FI.naturalHeight/5;
    for (let i = 0; i < fiender.length; i++) {
        var fiende=fiender[i];
        var tid=new Date()-fiende.tid;
        var x=tid*fiende.xfart+fiende.x;
        var y=tid*fiende.yfart+fiende.y; 
        if (y>innerHeight-fh&&fiende.yfart>0||y<0&&fiende.yfart<0) {
            fiende.yfart=-fiende.yfart;
            fiende.x=x ;
            fiende.y=y;
            fiende.tid=new Date(); 
        }
        if (x<0&&fiende.xfart<0||x>innerWidth-fb&&fiende.xfart>0) {
            fiende.xfart=-fiende.xfart;
            fiende.x=x ;
            fiende.y=y;
            fiende.tid=new Date(); 
        }
        ctx.drawImage(FI, 0, (tid / 300) % 2 < 1 ? 0 : 190, 254, 170, x,y,fb, fh);
    }
/**    
    const elapsed = (timeStamp*0.1)**1.2;    
    const spaceX = innerWidth - raket.naturalWidth;
    const spaceY = innerHeight - raket.naturalHeight;
    const x = Math.abs(spaceX - (elapsed % (2*spaceX)))
    const y = Math.abs(spaceY - (elapsed % (2*spaceY)))
    ctx.drawImage(raket, x, y, raket.naturalWidth, raket.naturalHeight);
*/    
    window.requestAnimationFrame(rita);
}

(async () => {
    raket = await loadImage('bilder/raket.svg');
    rymd = await loadImage('bilder/rymd.webp');
      FI = await loadImage('bilder/fiende.webp');
    // innerWidth - bredden på hela ytan
    // raket.naturalWidth - bredden på raketen
    raketx=innerWidth/2;
    raketx-=raket.naturalWidth/2;
    
    window.requestAnimationFrame(rita);
    
})();