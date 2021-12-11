//////////////zmienne oraz obiekty////////////////
var size={
	x: 20,
	y: 40
}
var position ={
	x: 10,
	y: 20
}
var painted =0;
var how_many =1;
var painted_x = [];
var painted_y = [];
var trap_x = [];
var trap_y = [];
var direction = "up";
var picture=false;
var end = false;
var restart = false;
const damage = new Audio("sounds/no.wav");
var container = document.querySelector(".key");
//////////////////////funkcja końcowa///////////////////////////////////////
var end_game = function(){
	end = true;
	document.getElementById(`naglowek`).innerHTML = "End Game";
};
////////////////////////////funkcja pausa/play/////////////////////////////////////
var button_pause = document.querySelector("#pause");
button_pause.addEventListener("click", function () {
		if(picture==false){
		end = true;
		document.getElementById("pause").src="img/play.png";
		picture=true;
	}
	else {
		end = false;
		document.getElementById("pause").src="img/pause.png";
		picture=false;
		move();
	}
}, false);

///////////////////////funkcja restart////////////////////
var button_restart = document.querySelector("#restart");
button_restart.addEventListener("click", function(){
	end=false;
	document.getElementById(`headline`).innerHTML = "The Painter Game";
	painted=0;
	position.x=10;
	position.y=20;
	direction = "up";
	restart=true;
	if(picture==true){
		document.getElementById("pause").src="img/pause.png";
		picture=false;
	}
	createTraps();
	move();
}, false);
//////////////start gry///////////////////////////////////////////////////////////////////
var starter = document.querySelector("#start");
starter.addEventListener("click", function() {
	move();
}, false);
////////////////funkcja odpowiada za przemieszczanie sie postaci///////////////////////
var move = function() {
	if(how_many==1)createTraps();
	document.addEventListener("keypress", onKeyPress);
	painted_x[painted] = position.x;
	painted_y[painted]= position.y;
	if(how_many!=1)painted++;
	how_many=2;
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
}
///////////funkcja rozdzielająca jaki klawisz wcisnął użytkownik///////////////////
var setContainerContents = function(key){
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
};
///////////////////////////funkcja sprawdza czy użytkownik nie wyszedł za mape jęsli tak to zmienia jego  pozycje na drugi koniec mapy//////////////////////
var check = function(axis, symbol, choose){
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

};


/////////pobranie klawisza z klawiatury//////
var onKeyPress = function(ev){ 
  var keyCode = ev.keyCode;
  setContainerContents(keyCode);
};

/////////////funkcja losująca//////////////
function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}
///////funkcja tworzaca płapki////////////////////////////
var createTraps = function(){
	for(let i=0;i<10;i++)
	{
		trap_x[i] = randomInt(0, 20);
		trap_y[i] = randomInt(0, 40);
	}
	map();
};
//////////////funkcja generujaca mape/////////////////////////////
function map(){
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

}