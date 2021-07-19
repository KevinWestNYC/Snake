let canvas;
let canvasContext;
const squareSize = 40;
let snakeHeadX = 160;
let snakeHeadY = 240;
let appleX = 200;
let appleY = 240;
let snakeSpeedX = 40;
let snakeSpeedY = 40;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 3;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

}

function moveEverything(){
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                snakeHeadX -= snakeSpeedX
                // alert('left');
                break;
            case 38:
                snakeHeadY -= snakeSpeedY    
                // alert('up');
                break;
            case 39:
                snakeHeadX += snakeSpeedX
                // alert('right');
                break;
            case 40:
                snakeHeadY += snakeSpeedY
                // alert('down');
                break;
        }
    };

}

function drawEverything(){
    drawCheckerboard();
    drawApple(appleX, appleY);
    drawSnake();
    
    if(snakeHeadX === appleX && snakeHeadY === appleY){
        randomlyPlaceApple()
    }

}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawCheckerboard() {
    
    const boardTopX = 0;
    const boardTopY = 0;

    for(let i=0; i<15; i++) {
      for(let j=0; j<15; j++) {
        canvasContext.fillStyle = ((i+j)%2==0) ? "seagreen":"green";
        let xOffset = boardTopX + j*squareSize;
        let yOffset = boardTopY + i*squareSize;
        canvasContext.fillRect(xOffset, yOffset, squareSize, squareSize);
      }
    }
    
    canvasContext.strokeStyle = "black";
    canvasContext.strokeRect(boardTopX, boardTopY, squareSize*15, squareSize*15)
  }

  function drawApple(appleX, appleY){
    colorRect(appleX, appleY, squareSize, squareSize, 'red')
  }

  function randomlyPlaceApple(){
      appleX = generateRandomNumber(0, 600, 40);
      appleY = generateRandomNumber(0, 600, 40);
    }

function generateRandomNumber(min, max, multiple) {
    let randomNumber = Math.floor(Math.random() * ((max - min) / multiple)) * multiple + min;
    return randomNumber;
    }

  function drawSnake(){
    drawSnakeHead(snakeHeadX,snakeHeadY);
    drawSnakeBody();
    drawSnakeTail();
  }

  function drawSnakeHead(snakeHeadX,snakeHeadY){
    colorRect(snakeHeadX, snakeHeadY, squareSize, squareSize, "white");
  }

  function drawSnakeBody(){
    colorRect(120, 240, squareSize, squareSize, "white")
  }

  function drawSnakeTail(){
    colorRect(80, 240, squareSize, squareSize, "white")
  }



















// event listeners for the keys 
// make snake move in desired direction
// make last snake cube go to the location of the box before it
// dont let snake go opposite direction 
// game over if hits wall or itself
// get lead snake box location
// grow snake after each apple 
