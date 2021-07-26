let canvas;
let canvasContext;
const squareSize = 40;
let currentScore = 0;
let highScore = 0;
let appleX = 200;
let appleY = 240;
let snakeMoveByOneSquare = 40;
let direction ='';


let snakeBody = [
  {x:160, y:240},
  {x:120, y:240},
  {x:80, y:240}
]

let snakeBodyCopy = []


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
  moveSnakeHead();
  makeSnakeBodyFollowSnakeHead();
  console.log(snakeBodyCopy);
}



function drawEverything(){
    drawCheckerboard();
    drawApple(appleX, appleY);
    drawSnake();
    
    if(snakeBody[0].x === appleX && snakeBody[0].y === appleY){
      randomlyPlaceApple();
      addScore();
      createHighScore();
    }
}



function colorRectangle(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}



  function drawApple(appleX, appleY){
    colorRectangle(appleX, appleY, squareSize, squareSize, 'red')
  }

  function randomlyPlaceApple(){
      appleX = generateRandomGridNumber(0, canvas.width, squareSize);
      appleY = generateRandomGridNumber(0, canvas.height, squareSize);
      return drawApple(appleX, appleY);
}

function generateRandomGridNumber(min, max, multiple) {
    let randomNumber = Math.floor(Math.random() * ((max - min) / multiple)) * multiple + min;
    return randomNumber;
    }

  function chooseSnakeDirection(){
    document.onkeydown = function(e) {
      e.preventDefault();
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

function moveSnakeHead(){
  chooseSnakeDirection()
    switch(direction){
    case 'left':
      snakeBody[0].x += -snakeMoveByOneSquare;
    break;
    case 'up':
      snakeBody[0].y += -snakeMoveByOneSquare ;
    break;
    case 'right':
      snakeBody[0].x += snakeMoveByOneSquare;  
    break;
    case 'down':
      snakeBody[0].y += snakeMoveByOneSquare; 
    break;
  }
}

function makeSnakeBodyFollowSnakeHead(){
  snakeBodyCopy = snakeBody.map(x => x);
  for(let i=1; i<snakeBody.length; i++){
    for(let j=0; j<snakeBodyCopy.length; j++){
      snakeBody[i] = snakeBodyCopy[i-1]
    }
  }
}

  function drawSnake(){
    for(let i=0; i<snakeBody.length; i++){
    colorRectangle(snakeBody[i].x, snakeBody[i].y, squareSize, squareSize, "white")
    }
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



// event listeners for the keys 
// make snake move in desired direction
// make last snake cube go to the location of the box before it
// dont let snake go opposite direction 
// game over if hits wall or itself
// get lead snake box location
// grow snake after each apple 
//portal that gives you big bonus multiplier, but reenters you randomly
