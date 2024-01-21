var exp = [];
var missiler = [];

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
var missil;
var ex;
var ex2;

window.addEventListener("keyup", ({keyCode}) => {
	if (vh == keyCode) {
		raketx = vx();
		vh = 56799876;
	}
	if (keyCode == 32) {
		m = 0;
	}
})
var st = new Date();

function SF(params) {
	var v = [];
	for (let sm = 0; sm < 10; sm++) {
		for (let gf = 0; gf < 3 + 2 * sm; gf++) {
			var fiende = {
				tid: new Date(),
				x: 1000 + gf * 100,
				y: -(10 + gf * 100 + sm * 1000),
				xfart: -0.4,
				yfart: 0.15,
			};
			v.push(fiende);
		}
	}
	return v;
}

var m = 0;
var fiender = SF();
window.addEventListener("keydown", ({keyCode}) => {
	if (keyCode == 32) {
		if (m == 0) {
			var misse = {
				tid: new Date(),
				x: vx() + raket.naturalWidth / 2 - missil.naturalWidth / 2,
				y: innerHeight - raket.naturalHeight,
			};
			missiler.push(misse);
			m = 1
		}
		return;
	}
	if (keyCode == vh) {
		return;
	}
	raketx = vx();
	sekund = new Date();
	vh = keyCode;
})

var sekund;
var vh;
var rymd;

function vx(params) {
	var ms = new Date() - sekund;
	var p = 1.0 * ms;
	if (65 == vh||97 == vh) {
		return raketx - p;
	}
	if (68 == vh||100 == vh) {
		return raketx + p;
	}
	return raketx;
}

function kd(x1,y1,w1,h1,x2,y2,w2,h2) {
		var tabort = 0.1;

		x1 += w1 * tabort;
		w1 -= 2 * tabort * w1;
		y1 += h1 * tabort;
		h1 -= 2 * tabort * h1;

		x2 += w2 * tabort;
		w2 -= 2 * tabort * w2;
		y2 += h2 * tabort;
		h2 -= 2 * tabort * h2;

	
		if(x1+w1 < x2) { // högersidan på 1 är till vänster om vänstersidan på 2
			return false;
		}
		if(x2+w2 < x1) { // högersidan på 2 är till vänster om vänstersidan på 1
			return false;
		}	
		if(y1+h1 < y2) { // undersidan på 1 är över ovansidan på 2
			return false;
		}
		if(y2+h2 < y1) { // undersidan på 2 är över ovansidan på 1
			return false;
		}
	    if (y1+h1 < 0 || y2+h2 < 0) {
			return false;
		}
	return true;
}

function rita(timeStamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// innerHeight - höjden på hela ytan
	// raket.naturalHeight - höjden på raketen

	// innerWidth - bredden på hela ytan
	// raket.naturalWidth - bredden på raketen

	var rakety = innerHeight - raket.naturalHeight;
	if (vx() < 0) {
		raketx = 0;
		vh = 1253246456468;
	}
	if (vx() > innerWidth - raket.naturalWidth) {
		raketx = innerWidth - raket.naturalWidth;
		vh = 1253246456468;
	}

	var rb = rymd.naturalWidth;
	var rh = rymd.naturalHeight;
	if (rb < innerWidth) {
		rh *= innerWidth / rb;
		rb = innerWidth;
	}
	var flytt = -(new Date() - st) / 5;
	var yStart = (Math.floor(flytt / rh) * rh) - flytt;
	for (let y = yStart; y < innerHeight; y = y + rh) {
		ctx.drawImage(rymd, 0, y, rb, rh);
	}
	for (let i = 0; i < missiler.length; i++) {
		var misse = missiler[i];
		var tid = new Date() - misse.tid;
		var x = misse.x;
		var y = misse.y - tid * 1;
		misse.ynu = y;
		ctx.drawImage(missil, x, y, missil.naturalWidth, missil.naturalHeight);
	}
	for (let z = 0; z < exp.length; z++) {
		var e=exp[z];
		var ram=Math.round(((new Date()-e.t)/1000)*81);
		var rad=Math.floor(ram/9);
		var kolumn=ram % 9;
		ctx.drawImage(e.b ? ex2 : ex, kolumn*100,rad*100,100,100,e.x,e.y,100,100);
		//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		
	}
	ctx.drawImage(raket, vx(), rakety, raket.naturalWidth, raket.naturalHeight);
	var fb = FI.naturalWidth / 5;
	var fh = FI.naturalHeight / 5;
	for (let i = fiender.length-1 ; i >=0; i--) {
		var fiende = fiender[i];
		var tid = new Date() - fiende.tid;
		var x = tid * fiende.xfart + fiende.x;
		var y = tid * fiende.yfart + fiende.y;
		if (y > innerHeight - fh && fiende.yfart > 0 || y < 0 && fiende.yfart < 0) {
			fiende.yfart = -fiende.yfart;
			fiende.x = x;
			fiende.y = y;
			fiende.tid = new Date();
		}
		if (x < 0 && fiende.xfart < 0 || x > innerWidth - fb && fiende.xfart > 0) {
			fiende.xfart = -fiende.xfart;
			fiende.x = x;
			fiende.y = y;
			fiende.tid = new Date();
		}
		for (let ii = missiler.length-1; ii >=0 ; ii--) {
			
            //fiendens width, height, x, y => fb, fh, x, y
			//misses width, height, x, y => misse.naturalWidth, misse.naturalHeight, misse.x, misse.ynu  
			var misse=missiler[ii];
			var krock=kd(x,y,fb,fh,misse.x,misse.ynu,missil.naturalWidth, missil.naturalHeight);
			if (krock) {
				fiender.splice(i,1);
				missiler.splice(ii,1);
				var e ={x:misse.x,
					   y:misse.ynu,
						t:new Date()
					   };
				exp.push(e);
			}
		}
		var krof = kd(x,y,fb,fh,vx(), rakety, raket.naturalWidth, raket.naturalHeight);
		if (krof) {
				var e ={
					x:x,
					y:y,
					t:new Date(),
					b:true,
				};
				exp.push(e);			
		}
		ctx.drawImage(FI, 0, (tid / 300) % 2 < 1 ? 0 : 190, 254, 170, x, y, fb, fh);
	}
	window.requestAnimationFrame(rita);
}

(async () => {
	raket = await loadImage('bilder/raket.svg');
	rymd = await loadImage('bilder/rymd.webp');
	FI = await loadImage('bilder/fiende.webp');
	missil = await loadImage('bilder/missil.png');
	raketx = innerWidth / 2;
	raketx -= raket.naturalWidth / 2;
	ex = await loadImage('bilder/explosion.png');
	ex2 = await loadImage('bilder/explosion2.png');
	window.requestAnimationFrame(rita);

})();

