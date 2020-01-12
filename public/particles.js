var canvas;
var players = {};
var bullets = {};
var test;
var socket;
var dir,mx,my;
function setup() {
	dir = 0;
    canvas = createCanvas(810, 540);
    canvas.parent('mainCanvas');
    frameRate(30);
	strokeWeight(1);
	stroke(0);
	//socket = io.connect('http://localhost:3000');
	socket = io();
	socket.emit('setinfo',{name:"Yuuki",color:255});
	
	socket.on('sceneupdate', function(data) {
		players = data;
		dir = players[socket.id].dir;
    });	
}
function draw() {
	clear();
	sceneupdate();
}

function sceneupdate(){
	for (var i in players){
		var tank = new Tank(players[i]);
		tank.draw();
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function Tank(obj){
	this.co = obj.color;
	this.x = obj.x;
	this.y = obj.y;
	this.name = obj.name;
	this.dir = obj.dir;
}
Tank.prototype.draw = function(){
	fill(this.co);	
	switch (this.dir){
		case 0 :
			beginShape();vertex(this.x+10, this.y);vertex(this.x+20, this.y);vertex(this.x+20, this.y+10);vertex(this.x+30, this.y+10);vertex(this.x+30, this.y+30);vertex(this.x, this.y+30);vertex(this.x, this.y+10);vertex(this.x+10, this.y+10);endShape(CLOSE);break;
		case 1 :
			beginShape();vertex(this.x, this.y);vertex(this.x+20, this.y);vertex(this.x+20, this.y+10);vertex(this.x+30, this.y+10);vertex(this.x+30, this.y+20);vertex(this.x+20, this.y+20);vertex(this.x+20, this.y+30);vertex(this.x, this.y+30);endShape(CLOSE);break;
		case 2 :
			beginShape();vertex(this.x, this.y);vertex(this.x+30, this.y);vertex(this.x+30, this.y+20);vertex(this.x+20, this.y+20);vertex(this.x+20, this.y+30);vertex(this.x+10, this.y+30);vertex(this.x+10, this.y+20);vertex(this.x, this.y+20);endShape(CLOSE);break;
		case 3 :
			beginShape();vertex(this.x+10, this.y);vertex(this.x+30, this.y);vertex(this.x+30, this.y+30);vertex(this.x+10, this.y+30);vertex(this.x+10, this.y+20);vertex(this.x, this.y+20);vertex(this.x, this.y+10);vertex(this.x+10, this.y+10);endShape(CLOSE);break;			
	}	
}
window.addEventListener("keydown", function (e) {
	if (e.which === 38) {
		if (dir == 0){	
			socket.emit('move',{x:0,y:-1});
		}else{			
			socket.emit('changedir',{dir:0});
		}
	} else if (e.which === 39) {
		if (dir === 1){
			socket.emit('move',{x:1,y:0});
		}else{
			socket.emit('changedir',{dir:1});
		}
	} else if (e.which === 40) {
		if (dir === 2){
			socket.emit('move',{x:0,y:1});
		}else{
			socket.emit('changedir',{dir:2});
		}
	} else if (e.which === 37) {
		if (dir === 3){
			socket.emit('move',{x:-1,y:0});
		}else{
			socket.emit('changedir',{dir:3});
		}
	}
});
