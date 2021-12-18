/**
 * 1. Fix out of boundires problem
 * 2. Fix gray fields problem
 * 3. Up click jezeli direction == up to blad
 * 4. Fix restart
 */
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
	generateMap(){
		let board="";
		for(let i=0;i<Map.size.y;i++){
			for(let j=0;j<Map.size.x;j++){
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
		if(axis=="x" && symbol=="+"){
			if((Player.position.x + 1) >=20){////dziala
				Player.position.x = 0;
				return false;
			}
		}
		else if(axis=="x" && symbol=="-"){
			if((Player.position.x - 1) <0){
				Player.position.x = 19;
				return false;
			}
		}
		else if(axis=="y" && symbol=="+"){
			if((Player.position.y + 1) >=40){///dziala
				Player.position.y = 0;
				return false;
			}
		}
		else if(axis=="y" && symbol=="-" ){
			if((Player.position.y - 1) <0){
				Player.position.y = 39;
				return false;
			}
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
	move() {
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
		/*/*checks if player entered a trap
		if(Map.trapsX.includes(this.position.x) && Map.trapsY.includes(this.position.y)){
			Game.damageSound.play();
			Game.endGame();
		}*/
		/*If player eneters in his own fields*/
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
	status:true, /////////true - game is on   false - game is poused
	isRestart: false,
	isEnd: false,
	damageSound: new Audio("sounds/no.wav"),
	endGame(){
		this.isEnd = true;
		document.getElementById(`naglowek`).innerHTML = "End Game";
	}
}
/*Event Listeners*/
let start = document.querySelector("#start");
start.addEventListener("click", function() {
	Map.generateTraps();
	Player.move();
}, false);

let gameStatus = document.querySelector("#pause");
gameStatus.addEventListener("click", function () {
	if(Game.status){/////if game is on and click then:
		Game.isEnd = true;
		document.getElementById("pause").src="img/play.png";
		Game.status = false;
	}
	else {/////if game is off and click then:
		Game.isEnd = false;
		document.getElementById("pause").src="img/pause.png";
		Game.status = true;
		Player.move();
	}
}, false);

/*var restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
	Game.isEnd = false;
	document.getElementById(`headline`).innerHTML = "The Painter Game";
	Player.score = 0;
	Player.position.x=10;
	Player.position.y=20;
	Player.direction = "up";
	document.getElementById("pause").src="img/pause.png";
	Map.createTraps();
	Player.move();
}, false);*/
