let canvas;
let canvasContext;
const squareSize = 40;
let snakeHeadX = 160;
let snakeHeadY = 240;
let appleX = 200;
let appleY = 240;
let snakeSpeedX = 40;
let snakeSpeedY = 40;
let direction ='';
let currentScore = 0;
let highScore = 0;


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 8;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

}

function moveEverything(){
  moveSnake();

}



function drawEverything(){
    drawCheckerboard();
    drawApple(appleX, appleY);
    drawSnake();
    
    if(snakeHeadX === appleX && snakeHeadY === appleY){
      randomlyPlaceApple();
      addScore();
      createHighScore();
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
      appleX = generateRandomNumber(0, canvas.width, squareSize);
      appleY = generateRandomNumber(0, canvas.height, squareSize);
      return drawApple(appleX, appleY);
}

function generateRandomNumber(min, max, multiple) {
    let randomNumber = Math.floor(Math.random() * ((max - min) / multiple)) * multiple + min;
    return randomNumber;
    }

  function chooseSnakeDirection(){
    document.onkeydown = function(e) {
      event.preventDefault();
      switch (e.keyCode) {
          case 37:
              if(direction != 'right'){
              direction='left';
              }
              break;
          case 38:
              if(direction != 'down'){
              direction = 'up';
              }
              break;
          case 39:
              if(direction != 'left'){
              direction='right';
              }
              break;
          case 40:
              if(direction != 'up'){
              direction='down';
              }
              break;
      }
  }
  return direction;
}

function moveSnake(){
  chooseSnakeDirection()
    switch(direction){
    case 'left':
    snakeHeadX += -snakeSpeedX;
    break;
    case 'up':
    snakeHeadY += -snakeSpeedY ;
    break;
    case 'right':
    snakeHeadX += snakeSpeedX;  
    break;
    case 'down':
    snakeHeadY += snakeSpeedY; 
    break;

  }
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

  function tellIfSquareIsOccupied(){
    if(canvas.fillStyle === white){
        return true
    } return false
}

function addScore(){
    currentScore += 1;
    document.getElementById("current-score").textContent = currentScore;
}

function createHighScore(){
  if(currentScore >= highScore){
    highScore = currentScore;
    document.getElementById("high-score").textContent = highScore
  }
}



// event listeners for the keys 
// make snake move in desired direction
// make last snake cube go to the location of the box before it
// dont let snake go opposite direction 
// game over if hits wall or itself
// get lead snake box location
// grow snake after each apple 
