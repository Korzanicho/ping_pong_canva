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

let playerPoints=0;
let aiPoints=0;

let newGame = true;

const table = () =>{
	ctx.fillStyle ="#000000";
	ctx.fillRect(0, 0, cw, ch);

	for(let linePosition=20; linePosition<=ch; linePosition+=30){
		ctx.fillStyle = "#ababab";
		ctx.fillRect(cw/2-lineWidth/2, linePosition, lineWidth, lineHeight);
	}
}
const ball = () =>{
    ctx.fillStyle = 'yellow';
	ctx.fillRect(ballX, ballY, ballSize, ballSize);
	
	ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0){
        ballSpeedY *= -1;
        ballY = 0;
        speedUp();
    }

    if(ballY >= ch - ballSize){
        ballSpeedY *= -1;
        ballY = ch - ballSize;
        speedUp();
    }

    if(ballX + ballSize >= cw){
        addPoint();
    }

    if(ballX <= 0){
        addPoint();
    }

    if(ballX <= playerX + paddleWidth && 
       ballX >= playerX && 
       ballY + ballSize >= playerY && 
       ballY <= playerY + paddleHeight){ 
        ballSpeedX *= -1;
        ballX = playerX + paddleWidth;  
        speedUp();
    }

    if(ballX + ballSize >= aiX && 
       ballX + ballSize <= aiX + paddleWidth &&
       ballY + ballSize >= aiY && 
       ballY <= aiY + paddleHeight){
        ballSpeedX *= -1;
        ballX = aiX - ballSize;
        speedUp();
    }
}

const getRndInteger = (min, max) =>{
	return Math.floor(Math.random() * (max - min) ) + min;
}

const addPoint = () => {
	let scoreDivs = document.getElementsByClassName("score");
	if(ballX > cw){
		ballReset();
		playerPoints++;
		scoreDivs[0].innerText = playerPoints;
	}
	if(ballX < 0){
		ballReset();
		aiPoints++;
		scoreDivs[1].innerText = aiPoints;
	}
}

const ballReset = () =>{
	newGame = true;
    ballX = playerX + paddleWidth;
    ballY = playerY + paddleHeight/2 - ballSize/2;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
	canvas.addEventListener("click",play);
}

const play = () =>{
	if(newGame){
		ballSpeedX = 3;
		ballSpeedY = 3;
	}
    newGame = false;
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

	if(playerY >= ch - paddleHeight){
		playerY = ch - paddleHeight;
	}
	if(playerY <= 0){
		playerY = 0;
	}
}

const aiPosition = () => {
	const middlePaddle = aiY+paddleHeight/2;
	const middleBall = ballY + ballSize/2;
	if(ballX >= 500){
		if(middlePaddle - middleBall > 200){
			aiY -= 15;
		}
		else if(middlePaddle - middleBall > 40){
			aiY -= 8;        
		}
		else if(middlePaddle - middleBall < -200){
			aiY += 15;
		}
		else if(middlePaddle - middleBall < -40){
			aiY += 8;
		}   
	}
    else if(ballX < 500)
    {
        if(middlePaddle - middleBall > 100){
            aiY -= 4;
        }
        else if(middlePaddle - middleBall < -100){
            aiY += 4;
        }
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
	if(!newGame){
		ball();
	}
	else{ ballReset() }
	player();
	ai();
	aiPosition();
	addPoint();
}
setInterval(game, 1000 / 60);


