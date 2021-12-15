let Map = {
	size:{
		x: 20,
		y: 40
	},
	paintedFieldsX: [],
	paintedFieldsY: [],
	trapsX: [],
	trapsY: [],
	numberOfTraps: 10,
	picture: false,
	generateMap(){
		let board="";
		for(let i=0;i<Map.size.y;i++)
		{
			for(let j=0;j<Map.size.x;j++)
			{
				board = board +`<div id="squer${i}.${j}" class="square"></div>`;
			}
			board = board + '<div style="clear:both"></div>';
		}
		document.getElementById("board").innerHTML=board;
		for(let i=0;i<Player.score;i++)document.getElementById(`squer${Map.paintedFieldsY[i]}.${Map.paintedFieldsX[i]}`).style.background="gray";
		for(let i=0;i<Map.numberOfTraps;i++)document.getElementById(`squer${Map.trapsY[i]}.${Map.trapsX[i]}`).style.background="orange";
		document.getElementById(`squer${Player.position.y}.${Player.position.x}`).style.background="red";
		if(Player.score==0)Map.generateTraps();
	},
	/////Random number///
    randomInt(min, max) {
	  return min + Math.floor((max - min) * Math.random());
  	},
	generateTraps(){
	  for(let i=0;i<Map.numberOfTraps;i++){
		  this.trapsX[i] = this.randomInt(0, 20);
		  this.trapsY[i] = this.randomInt(0, 40);
	  }
  	},
	isOutOfBoundries(axis, symbol){
		if(axis=="x" && symbol=="+" && (Player.position.x + 1) >=20){
			Player.position.x=-1;
			return false;
		}
		else if(axis=="x" && symbol=="-" && (Player.position.x - 1) <0){
			Player.position.x=20;
			return false;
		}
		else if(axis=="y" && symbol=="+" && (Player.position.y + 1) >=40){
			Player.position.y=-1;
			return false;
		}
		else if(axis=="y" && symbol=="-" && (Player.position.y - 1) <0){
			Player.position.y=40;
			return false;
		}
		return true;
	},
}
let Player = {
	score: 0,
	position: {
		x: 10,
		y: 20
	},
	direction: "up",
	isFirstMove: false,
	move() {
		if(this.isFirstMove==false)Map.generateTraps();
		this.isFirstMove=true;
		document.addEventListener("keypress", this.onKeyPress);
		Map.paintedFieldsX[this.score] = this.position.x;
		Map.paintedFieldsY[this.score] = this.position.y;
		this.score++;
		switch(this.direction){
			case 'up':
				if(Map.isOutOfBoundries("y", "-"))this.position.y--;
				break;
			case 'down':
				if(Map.isOutOfBoundries("y", "+"))this.position.y++;
				break;
			case 'right':
				if(Map.isOutOfBoundries("x", "+"))this.position.x++;
				break;
			case 'left':
				if(Map.isOutOfBoundries("x", "-"))this.position.x--;
				break;
		}
		for(let i=0;i<Map.numberOfTraps;i++){
			if(Map.trapsX[i]==this.position.x && Map.trapsY[i]==this.position.y){
				Game.damageSound.play();
				Game.endGame();
			}
		}
		/*if(document.getElementById(`squer${this.position.y}.${this.position.x}`).style.background=="gray" && Game.isRestart==false){
			Game.damageSound.play();
			Game.endGame();
		}*/
		Map.generateMap();
		Game.isRestart = false;
		document.getElementById(`score`).innerHTML=Player.score;
		if(!Game.isEnd)setTimeout("Player.move()",300);
	},
	/////Pressed Key///
	onKeyPress(ev){ 
		var keyCode = ev.keyCode;
		Player.setContainerContents(keyCode);
	},
	setContainerContents(key){
		switch(key)
		{
			case 119:
				Player.direction="up";
				break;
			case 115:
				Player.direction="down";
				break;
			case 100:
				Player.direction="right";
				break;
			case 97:
				Player.direction="left";
				break;
			/*case 32:
				button2();
				break;*/
		}
		Map.generateMap();
	},
}
let Game = {
	isRestart: false,
	isEnd: false,
	damageSound: new Audio("sounds/no.wav"),
	gameStatus: true,////////Play or Pouse
	endGame(){
		this.isEnd = true;
		document.getElementById(`naglowek`).innerHTML = "End Game";
	}
}
/*Event Listeners*/
var start = document.querySelector("#start");
start.addEventListener("click", function() {
	Player.move();
}, false);

/*var gameStatus = document.querySelector("#pause");
gameStatus.addEventListener("click", function () {
	if(Map.picture==false){
		Game.setEnd(true);
		document.getElementById("pause").src="img/play.png";
		Map.picture=true;
	}
	else {
		Game.setEnd(false);
		document.getElementById("pause").src="img/pause.png";
		Map.picture=false;
		Player.move();
	}
}, false);

var restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
	Game.isEnd = false;
	document.getElementById(`headline`).innerHTML = "The Painter Game";
	Player.score = 0;
	Player.position.x=10;
	Player.position.y=20;
	Player.direction = "up";
	if(Map.picture==true){
		document.getElementById("pause").src="img/pause.png";
		Map.picture=false;
	}
	Map.createTraps();
	Player.move();
}, false);*/
