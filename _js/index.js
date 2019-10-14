"use strict";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const ballSize = 20;

let ballX = cw/2-ballSize/2;
let ballY = ch/2-ballSize/2;

let paddleHeight = 100;
let paddleWidth = 10;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 3;
let ballSpeedY = 3;

const table = () =>{
	ctx.fillStyle ="#000000";
	ctx.fillRect(0, 0, cw, ch);

	for(let linePosition=20; linePosition<=ch; linePosition+=30){
		ctx.fillStyle = "#ababab";
		ctx.fillRect(cw/2-lineWidth/2, linePosition, lineWidth, lineHeight);
	}
}
const ball = () =>{
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(ballX, ballY, ballSize, ballSize);

	ballX+=ballSpeedX;
	ballY+=ballSpeedY;

	if(ballY<=0 || ballY + ballSize>= ch){
		ballSpeedY = -ballSpeedY;
	}
	if(ballX <=0 || ballX + ballSize>= cw){
		ballSpeedX = -ballSpeedX;
	}

	if(ballX <= playerX+paddleWidth && ballY+ballSize/2 >= playerY && ballY + ballSize/2 <= playerY+paddleHeight){
		speedUp();
		ballSpeedX = -ballSpeedX;
		ballSpeedY = -ballSpeedY;	
	}
	if(ballX+ballSize >= aiX && ballY-paddleWidth+ballSize/2 >= aiY && ballY + ballSize/2 <= aiY+paddleHeight){
		speedUp();
		ballSpeedX = -ballSpeedX;
		ballSpeedY = -ballSpeedY;
	}
}

const player = () =>{
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

const ai = () =>{
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

let topCanvas = canvas.offsetTop;

const playerPosition = (e) =>{
	playerY = e.clientY - topCanvas -paddleHeight/2;

	if(playerY >= ch -paddleHeight){
		playerY = ch - paddleHeight;
	}
	if(playerY <= 0){
		playerY = 0;
	}
}

const aiPosition = () => {
	const middlePaddle = aiY+paddleHeight/2;
	const middleBall = ballY + ballSize/2;
	if(ballX > 500){
		if(middlePaddle-middleBall > 200){
			aiY -=20;
		}
		else if(middlePaddle-middleBall > 50){
			aiY -=8;
		}
		else if(middlePaddle-middleBall < -200){
			aiY +=20;
		}
		else if(middlePaddle-middleBall < -50){
			aiY +=8;
		}
	}
	else if(ballX <= 500 && ballX>150){
		if(middlePaddle-middleBall > 100){
			aiY -= 3;
		}
		else if(middlePaddle-middleBall < -100){
			aiY += 3;
		}
		// while(!(middlePaddle.offsetTop+topCanvas != topCanvas+ch/2)){
		// 	console.log('hej');			
		// }
	}
	// aiY = playerY;
}

const speedUp = () =>{
	if(ballSpeedX>0 && ballSpeedX<16){
		ballSpeedX+=0.1;
	}else
	if(ballSpeedX<0 && ballSpeedX>-16){
		ballSpeedX-=0.1;
	}
	if(ballSpeedY>0 && ballSpeedY<16){
		ballSpeedY+=0.1;
	}else
	if(ballSpeedY<0 && ballSpeedY>-16){
		ballSpeedY-=0.1;
	}
}

canvas.addEventListener("mousemove", playerPosition);


const game = () =>{

	table();
	ball();
	player();
	ai();
	aiPosition();
}
setInterval(game, 1000 / 60);


