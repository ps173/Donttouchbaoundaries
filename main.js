const cvs = document.getElementById("canvas");
const cxt = cvs.getContext("2d");
let player,d,boundaries;
let score = 0;
let m_src = ["music.mp3","music2.wav","music3.wav"]
let bgmusic = new Audio(m_src[Math.floor(Math.random()*3)]);

player = {
    x : cvs.width/2,
    y : cvs.height/2,
    velocity_x : 2,
    velocity_y : 5,
    height : 40,
    width : 40,
};

class Faliingblocks{
    constructor(posx){
        this.posx = posx;
        this.y = cvs.height/2;
        this.velocity_y = 5;
        this.height = Math.random()*30;
        this.width = Math.random()*30;
    }
}
//now problem is how to genrate infinite falling bolcks...
//I think this can be done by creating an array of blocks with different positions
//so if i somehow mange to recycle and reuse those blocks then kabooom...
function gameLoop(){
    cvs.height = 640;
    cvs.width = 800;
    cxt.fillStyle = "black";
    cxt.fillRect(0,0,cvs.width,cvs.height);
    cxt.fillStyle = "white";
	// cxt.font = "50px classic"
    // cxt.fillText(`❖`,player.x,player.y);
    cxt.fillRect(player.x, player.y, player.height, player.width);
    cxt.font = "50px classic";
    cxt.fillStyle="blue";
    cxt.fillText(score, 20 , 40);
    cxt.font = "20px zealot";
    cxt.fillStyle="white";
    cxt.fontsize = "100px"
    cxt.fillText(`do not touch the boundaries`,200,310 );
    boundaries = false;
    bgmusic.play();

    if(d=="LEFT") {
        player.x-=player.velocity_x;
        score += 1;
    }	
	if(d=="RIGHT") {
        player.x+=player.velocity_x;
        score += 1;
    }	
	if(d=="UP") {
        player.y -=  player.velocity_y;
        score += 2;
    }		
    if(d=="STOP") {
        player.velocity_x += 0;
        player.velocity_y += 0;
        score +=0;
    };
    //boundaries
    if(player.x <= 0){
        player.x = 0;
        boundaries = true;
    }

    if(player.x >= 800-player.width){
        player.x = 800;
        boundaries = true;
    }

    if(player.y<=0){
        player.y = 0;
        boundaries = true;
    }

    if(player.y>=640-player.height){
        player.y = 640;
        boundaries = true;
    }

    if(score>1000){
        player.y += player.velocity_y * 0.5 ;  
    }

    //physics

    player.y += player.velocity_y * 0.3 ;  
    // player.x += player.velocity_x * 0.6;     

    //game over
    if(boundaries == true){
        clearInterval(game);
        cxt.fillStyle = "#167071";
        cxt.fillRect(0,0,cvs.width,cvs.height);
        cxt.font = "20px classic"
        cxt.fillStyle="white";
        cxt.fillText(`game over.. reload`,250,310 );
        cxt.fillText(`your score was:  ${score} pts`,250,330);
        player.velocity_y=0;
        player.velocity_x=0;
        player.y = player.velocity_y;
        player.x = player.velocity_x;
        bgmusic.pause();
    }
       
}

//controls
function direction(event){
	if(event.keyCode==37){
		d="LEFT";
	}else if(event.keyCode==39 ){
		d="RIGHT";
	}else if(event.keyCode==38 ){
		d="UP";
	}
};

function stopPlayer(){
   d="STOP";
}


window.addEventListener("keydown",direction);
window.addEventListener("keyup" , stopPlayer);
let game = setInterval(gameLoop,10);
