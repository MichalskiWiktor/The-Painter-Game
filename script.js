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
		for(let i=0;i<size.y;i++)
		{
			for(let j=0;j<size.x;j++)
			{
				board = board +`<div id="squer${i}.${j}" class="square"></div>`;
			}
			board = board + '<div style="clear:both"></div>';
		}
		document.getElementById("board").innerHTML=board;
		for(let i=0;i<painted;i++)document.getElementById(`squer${painted_y[i]}.${painted_x[i]}`).style.background="gray";
		for(let i=0;i<10;i++)document.getElementById(`squer${trap_y[i]}.${trap_x[i]}`).style.background="orange";
		document.getElementById(`squer${position.y}.${position.x}`).style.background="red";
		if(painted==0)createTraps();
	},
	/////Random number///
    randomInt(min, max) {
	  return min + Math.floor((max - min) * Math.random());
  	},
  ///////funkcja tworzaca płapki////////////////////////////
	generateTraps(){
	  for(let i=0;i<numberOfTraps;i++){
		  this.trapsX[i] = randomInt(0, 20);
		  this.trapsY[i] = randomInt(0, 40);
	  }
  	},
	check(axis, symbol, choose){
		if(axis=="x" && symbol=="+")
		{
			if((position.x + 1) >=20)
			{
				choose==false;
				position.x=-1;
			}
		}
		else if(axis=="x" && symbol=="-")
		{
			if((position.x - 1) <0)
			{
				choose==false;
				position.x=20;
			}
		}
		else if(axis=="y" && symbol=="+")
		{
			if((position.y + 1) >=40)
			{
				choose==false;
				position.y=-1;
			}
		}
		else if(axis=="y" && symbol=="-")
		{
			if((position.y - 1) <0)
			{
				choose==false;
				position.y=40;
			}
		}
		return choose;
	
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
		document.addEventListener("keypress", onKeyPress);
		painted_x[painted] = position.x;
		painted_y[painted]= position.y;
		painted++;
		let choose = true;
		if(direction=="up"){
			choose = check("y", "-", choose);
			if(choose==true)position.y--;
		}
		else if(direction=="down"){
			choose = check("y", "+", choose);
			if(choose==true)position.y++;
		}
		else if(direction=="right"){
			choose = check("x", "+", choose);
			if(choose==true)position.x++;
		}
		else if(direction=="left"){
			choose = check("x", "-", choose);
			if(choose==true)position.x--;
		}
		for(let i=0;i<10;i++)
		{
			if(trap_x[i]==position.x && trap_y[i]==position.y)/////////////////checkenie czy uzytkownik dostal punkt
			{
				damage.play();
				end_game();
			}
		}
		if(document.getElementById(`squer${position.y}.${position.x}`).style.background=="gray" && restart==false)
			{
				damage.play();
				end_game();
			}
		map();
		restart=false;
		document.getElementById(`score`).innerHTML=painted;
		if(!end)setTimeout("move()",300);
	},
	/////Pressed Key///
	onKeyPress(ev){ 
		var keyCode = ev.keyCode;
		setContainerContents(keyCode);
	},
	setContainerContents(key){
		switch(key)
		{
			case 119:
				direction="up";
				break;
			case 115:
				direction="down";
				break;
			case 100:
				direction="right";
				break;
			case 97:
				direction="left";
				break;
			case 32:
				button2();
				break;
		}
		map();
	},
}
let Game = {
	isEnd: false,
	damageSound: new Audio("sounds/no.wav"),
	gameStatus: true,////////Play or Pouse
}
/*Event Listeners*/
var start = document.querySelector("#start");
start.addEventListener("click", function() {
	Player.move();
}, false);

var gameStatus = document.querySelector("#pause");
gameStatus.addEventListener("click", function () {
	if(picture==false){
		Game.setEnd(true);
		document.getElementById("pause").src="img/play.png";
		picture=true;
	}
	else {
		Game.setEnd(false);
		document.getElementById("pause").src="img/pause.png";
		picture=false;
		move();
	}
}, false);

var restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
	//document.getElementById(`naglowek`).innerHTML = "End Game";
	Game.isEnd = false;
	document.getElementById(`headline`).innerHTML = "The Painter Game";
	Player.score = 0;
	Player.position.x=10;
	Player.position.y=20;
	Player.direction = "up";
	if(picture==true){
		document.getElementById("pause").src="img/pause.png";
		picture=false;
	}
	createTraps();
	move();
}, false);
