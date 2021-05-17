// Joshua Hendrix Snake Game- 
//Base system design inspired from Youtube video "Coding "Snake" in 4 min 30 sec (plain browser JavaScript)" URL:https://www.youtube.com/watch?v=xGmXxpIj6vs


window.onload=function() {//When the window loads
    Gameboard=document.getElementById("canvas").getContext("2d");//used Gameboard to represent the 2d context of the canvas element
    document.addEventListener("keydown",keyPush);//Event listener for keys
    setInterval(gameFrame,1000/10);//calling game function 10 times a second
}
var alert="";
var score=0;//player score
var playerx=playery=10;//player x and y coordinates, snakes head location 
const Gridsize=15;//Gridsize in px, this defines the gridsquare or tile size
const tileCount=40;//tileCount is the amount of tiles per the height and width the grid, 
var applex=appley=15;// apple x and y coordinates
var grapex=grapey=30;//grape x and y coordinates
var melonx=melony=5;//melon x and y coordinates
var xvelocity=1;//x velocity set to 1 so we move on page load which prevents some buggy issues with the snake
var yvelocity=0;//x and y velocity values we will use to move
var trailHistory=[];//array of coordinates history to store trail history for tail to be drawn
var tailLength = 5;//length of tail

function gameFrame() {//Gameframe function running every frame
    Gameboard.fillStyle="black";
    Gameboard.fillRect(0,0,600,600);
    for(let i=0;i<tileCount;i++)
    {
        for(let j=0;j<tileCount;j++)
        {
            var my_gradient = Gameboard.createLinearGradient(0, 0, 600, 600);
my_gradient.addColorStop(0, "#222222");
my_gradient.addColorStop(1, "#444666");
Gameboard.fillStyle = my_gradient;
            Gameboard.fillRect(i*Gridsize,j*Gridsize,Gridsize-1,Gridsize-1);
        }
    }
    
	MovePlayer();//Run move player function
    CheckForFruit();    //Run CheckForApple function
    Gameboard.font = "16px Arial";
    Gameboard.fillStyle = "#00FFFF";
    Gameboard.fillText("Score: "+score, 8, 20);
    Gameboard.fillText("Alert: "+alert,8,540);
}
function MovePlayer(){
	playerx+=xvelocity;//player x coordinate add x velocity, this moves the snake left and right
	
    playery+=yvelocity;//player y add y velocity, this moves the snake up and down
	
    if(playerx<0) {//if player x is less than 0, hitting the left side
	playerx= tileCount-1;}//put player x to other side of board, the right
    if(playerx>tileCount-1) {//if we are out of bounds on the right side
	playerx= 0;}//set player x to left of the board
    if(playery<0) {//if player y less than 0, hitting the top
	playery= tileCount-1;}//set player y to bottom of board
    if(playery>tileCount-1) {//if player y greater than bottom of board
	playery= 0;}//set player y to the top of the board
	
	Gameboard.fillStyle="green";//set fill style to green to draw snake
    for(var i=0;i<trailHistory.length;i++) {	//for loop to cycle the snake tail coordinates in trailHistory array
        Gameboard.fillRect((trailHistory[i].x*Gridsize),(trailHistory[i].y*Gridsize),Gridsize-1,Gridsize-1);//draw snake body, using trailHistory x and y coordinates times by the gridsize pixel width, the width and height are -2 so there is a border
        if(trailHistory[i].x==playerx && trailHistory[i].y==playery) {//if we run into the tail it resets tailLength and score
            tailLength = 5;
			score=0;
			document.getElementById("score").innerHTML="Score: "+ score;//update score
            document.getElementById("alert").innerHTML="Alert: You ATE your tail!";
            alert="You ATE your tail!";//Display alert
			setTimeout(() => { document.getElementById("alert").innerHTML="Alert: ";}, 2000);//Remove after 2 seconds
        }
    }
	
    trailHistory.push({x:playerx,y:playery});//add new coordinates to end of the trailHistory array
    while(trailHistory.length>tailLength) {//if trail history is longer than tailLength, we take from the oldest coordinate, the first in the array
    trailHistory.shift();//using shift we remove from the last in the array
    }
}
function CheckForFruit(){
	Gameboard.fillStyle="gold";//set fill style to gold
    Gameboard.fillRect((applex*Gridsize)+4,(appley*Gridsize)+4,Gridsize-8,Gridsize-8);//draw apple, note it is smaller than other rectangles with -8 px width and height and 4 px offset on the x and y
    Gameboard.fillStyle="purple";//set fill style to purple
    Gameboard.fillRect((grapex*Gridsize)+4,(grapey*Gridsize)+4,Gridsize-8,Gridsize-8);//draw grape
    Gameboard.fillStyle="pink";//set fill style to pink
    Gameboard.fillRect((melonx*Gridsize)+4,(melony*Gridsize)+4,Gridsize-8,Gridsize-8);//draw melon
	if(applex==playerx && appley==playery) {//if we hit the apple
		SpawnApple();//Spawn new apple
        tailLength++;//increase tail length
		score=tailLength-5;//set score, since we start with a length of 5 we minus it from the tailLength to get the score
		document.getElementById("score").innerHTML="Score: "+ score;//update score if we do
        document.getElementById("alert").innerHTML="Alert: You got an apple!";//Display alert
        alert="You got an apple!";
		setTimeout(() => { document.getElementById("alert").innerHTML="Alert: ";}, 2000)}//Remove after 2 seconds
    if(grapex==playerx && grapey==playery) {//if we hit the grape
            SpawnGrape();//Spawn new grape
            tailLength++;//increase tail length
            score=tailLength-5;//set score, since we start with a length of 5 we minus it from the tailLength to get the score
            document.getElementById("score").innerHTML="Score: "+ score;//update score if we do
            document.getElementById("alert").innerHTML="Alert: You got a grape!";//Display alert
            alert="You got a grape!";
            setTimeout(() => { document.getElementById("alert").innerHTML="Alert: ";}, 2000)}//Remove after 2 seconds
    if(melonx==playerx && melony==playery) {//if we hit the melon
                SpawnMelon();//Spawn new grape
                tailLength++;//increase tail length
                score=tailLength-5;//set score, since we start with a length of 5 we minus it from the tailLength to get the score
                document.getElementById("score").innerHTML="Score: "+ score;//update score if we do
                document.getElementById("alert").innerHTML="Alert: You got a melon!";//Display alert
                alert="You got a melon!";
                setTimeout(() => { document.getElementById("alert").innerHTML="Alert: ";}, 2000)}}//Remove after 2 seconds
        
function SpawnMelon(){
            melonx=Math.floor(Math.random()*tileCount);
            melony=Math.floor(Math.random()*tileCount);//create a new location for melon
                for(var i=0;i<trailHistory.length;i++){//for loop to check to see if new location is in snake
                    if(trailHistory[i].x==melonx && trailHistory[i].y==melony){//if location is in snakes body {
                        SpawnMelon();}//recursively run spawn melon to create new location
        }
}
function SpawnGrape(){
    grapex=Math.floor(Math.random()*tileCount);
    grapey=Math.floor(Math.random()*tileCount);//create a new location for grape
        for(var i=0;i<trailHistory.length;i++){//for loop to check to see if new location is in snake
            if(trailHistory[i].x==grapex && trailHistory[i].y==grapey){//if location is in snakes body {
                SpawnGrape();}//recursively run spawn grape to create new location
            }
}
function SpawnApple(){
	applex=Math.floor(Math.random()*tileCount);
    appley=Math.floor(Math.random()*tileCount);//create a new location for apple
		for(var i=0;i<trailHistory.length;i++){//for loop to check to see if new location is in snake
			if(trailHistory[i].x==applex && trailHistory[i].y==appley){//if location is in snakes body {
				SpawnApple();}//recursively run spawn apple to create new location
			}
}



function keyPush(Event) {//When a key is pressed
    switch(Event.keyCode) {//a switch condition is checked for the keyboard keycode
        case 37: //Left arrow keycode
            xvelocity=-1;yvelocity=0;//decrease x
            break;
        case 38://Up arrow keycode
            xvelocity=0;yvelocity=-1;//decrease y since we start with y at 0 in the upper left the y coordinates become inversed from traditional graph values as we are working in the 2nd quadrant
            break;
        case 39://Right arrow keycode
            xvelocity=1;yvelocity=0;//increase x
            break;
        case 40://Down arrow keycode
            xvelocity=0;yvelocity=1;//increase y
            break;
    }
}