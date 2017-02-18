var ctx;
var thingelem;
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var alphabety = 300;
var alphabetx = 20;
var alphabetWidth = 25;
var secret;
var lettersGuessed = 0;
var secretx = 160;
var secrety = 50;
var secretWidth = 50;
var gallowsColor = "brown";
var faceColor = "tan";
var bodyColor = "tan";
var nooseColor = "#F60";
var bodyCenterx = 70;
var steps = [
	drawGallows,
	drawHead,
	drawBody,
	drawRightArm,
	drawLeftArm,
	drawRightLeg,
	drawLeftLeg,
	drawNoose
];
var cur = 0;

function drawGallows() {
	ctx.lineWidth = 8;
	ctx.strokeStyle = gallowsColor;
	ctx.beginPath();
	ctx.moveTo(2,180);
	ctx.lineTo(40, 180);
	ctx.moveTo(20, 180);
	ctx.lineTo(20, 40);
	ctx.moveTo(2, 40);
	ctx.stroke();
	ctx.closePath();
}

function drawHead() {
	ctx.lineWidth = 3;
	ctx.strokeStyle = faceColor;
	ctx.save();
	ctx.scale(.6, 1);
	ctx.beginPath();
	ctx.arc(bodyCenterx/ .6, 80, 10, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawBody() {
	ctx.strokeStyle = bodyColor;
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 90);
	ctx.lineTo(bodyCenterx, 125);
	ctx.stroke();
	ctx.closePath();
}

function drawRightArm() {
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 100);
	ctx.lineTo(bodyCenterx + 20, 110);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftArm() {
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 100);
	ctx.lineTo(bodyCenterx-20, 110);
	ctx.stroke();
	ctx.closePath();
}

function drawRightLeg() {
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 125);
	ctx.lineTo(bodyCenterx+10, 155);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftLeg() {
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 125);
	ctx.lineTo(bodyCenterx-10, 155);
	ctx.stroke();
	ctx.closePath();
}

function drawNoose() {
	ctx.strokeStyle = nooseColor;
	ctx.beginPath();
	ctx.moveTo(bodyCenterx-10, 40);
	ctx.lineTo(bodyCenterx-5, 95);
	ctx.stroke();
	ctx.closePath();
	ctx.save();
	ctx.scale(1,.3);
	ctx.beginPath();
	ctx.arc(bodyCenterx, 90/.3,8,0,Math.PI*2, false);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
	drawNeck();
	drawHead();
}

function drawNeck() {
	ctx.strokeStyle = bodyColor;
	ctx.beginPath();
	ctx.moveTo(bodyCenterx, 90);
	ctx.lineTo(bodyCenterx, 95);
	ctx.stroke();
	ctx.closePath();
}

function init() {
	ctx = document.getElementById('canvas').getContext('2d');
	setupGame();
	ctx.font="bold 20pt Ariel";
}

function setupGame() { 
	var i;
	var x; 
	var y;
	var uniqueid;
	var an = alphabet.length;
	for(var i=0; i<an; i++) {
		console.log(String(i));
		uniqueid = "a" + String(i);
		console.log(uniqueid);
		d = document.createElement('alphabet');
		d.innerHTML = '<div class = letters ' + 'id='+ uniqueid + '>' + alphabet[i] + '</div>';
		document.body.appendChild(d);
		thingelem = document.getElementById(uniqueid);
		x = alphabetx + alphabetWidth*i;
		y = alphabety;
		thingelem.style.top = String(y)+"px";
		thingelem.style.left = String(x)+"px";
		thingelem.addEventListener('click', pickelement, false);
	}
	var ch = Math.floor(Math.random()*words.length);
	secret = words[ch];

	for(i=0; i<secret.length; i++) {
		uniqueid = "s" + String(i);
		d = document.createElement('secret');
		d.innerHTML = '<div class= blanks ' + 'id='+ uniqueid + '>__</div>';
		document.body.appendChild(d);
		thingelem = document.getElementById(uniqueid);
		x = secretx + secretWidth*i;
		y = secrety;
		thingelem.style.top = String(y)+"px";
		thingelem.style.left = String(x)+"px";
	}
	steps[cur]();
	cur++;
	return false;
}

function pickelement(ev) {
	var not = true;
	var picked = this.textContext;
	var i;
	var j;
	var uniqueid;
	var thingelem;
	var out;
	for(i=0; i<secret.length; i++) {
		if(picked==secret[i]){
			id = "s" + String(i);
			document.getElementById(id).textContext = picked;
			not = false;
			lettersGuessed++;
			if(lettersGuessed==secret.length) {
				ctx.fillStyle = gallowsColor;
				out = "You WON!";
				ctx.fillText(out, 200, 80);
				ctx.fillText("Re-load the page to try again.", 200, 120);
				for(j=0; j<alphabet.length; j++){
					uniqueid ="a"+String(j);
					thingelem = document.getElementById(uniqueid);
					thingelem.removeEventListener('click',pickelement, false);
				}
			}
		}
	}
	if(not) {
		steps[cur]();
		cur++;
		if(cur>=steps.length) {
			for(i=0; i<secret.length; i++) {
				id = "s"+String(i);
				document.getElementById(id).textContext = secret[i];
			}
			ctx.fillStyle = gallowsColor;
			out = "You Lost!";
			ctx.fillText(out, 200, 80);
			ctx.fillText("Re-load the page to try again.", 200, 120);
			for(j=0; j<alphabet.length; j++) {
				uniqueid = "a"+String(i);
				thingelem = document.getElementById(uniqueid);
				thingelem.removeEventListener('click',pickelement, false);
			}
		}
	}
	var id = this.id;
	document.getElementById(id).style.display = "none";
}
