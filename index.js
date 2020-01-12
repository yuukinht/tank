var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);
//var server = app.listen(3000);
app.use(express.static('public'));
var io = require('socket.io')(server);
var players = {};
var bullets = {};
var socketlist = {};
var wWidth = 810;
var wHeight = 540;
io.sockets.on('connection',
  function (socket) { 
	players[socket.id] = new Player();
	socketlist[socket.id] = socket;
	socket.on('setinfo', function(data) {		
		players[socket.id].name = data.name;		
		players[socket.id].color = data.color;		
	});
	socket.on('move', function(data) {
		
		var px = players[socket.id].x;
		var py = players[socket.id].y;
		var x = data.x*10;
		var y = data.y*10;
		if ((px+x>-1)&&(px+x<wWidth-29)){
			var kt = true;
			for(var i in players){
				if (((Math.abs(px+x-players[i].x)<30)&&(Math.abs(py+y-players[i].y)<30))&&(i !== socket.id)){
					kt = false;
				}
			}
			if (kt == true){players[socket.id].x += data.x*10;}
		}
		if ((py+y>-1)&&(py+y<wHeight-29)){
			var kt = true;
			for(var i in players){
				if (((Math.abs(px+x-players[i].x)<30)&&(Math.abs(py+y-players[i].y)<30))&&(i !== socket.id)){
					kt = false;
				}
			}			
			if (kt == true){players[socket.id].y += data.y*10;}
		}		
    });
	socket.on('changedir', function(data) {
		players[socket.id].dir = data.dir;
    });	
    socket.on('disconnect', function() {
		delete players[socket.id];
    });	
  }
);
setInterval(function(){
	for(var i in socketlist){
		socketlist[i].emit('sceneupdate',players);
	}
},1000/30);
function Player(){
	var pl = {
		name:"Player",
		x:0,
		y:0,
		dir:0,
		color:0
	}
	return pl;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



