// dont let snake go opposite direction (tighten up)
//don't let apple appear under snake body
//create start screen

document.addEventListener("keyup",startNewGameAfterGameOver)


window.onload = function() {  
  if(showingStartScreen){
    drawCheckerboard();
    drawApple(appleX, appleY);
    drawSnake();
    
    canvasContext.fillStyle = 'white';
    canvasContext.font = "25px 'Press Start 2P'"
    canvasContext.fillText("Press -> To Start", 95, 350);
    document.addEventListener("keyup", function(e){
     if(e.keycode = 39){
      showingStartScreen = false


    setInterval(function() {
      gameOver();  
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  }
  })
}
  }


function startNewGameAfterGameOver(e){
  if(e.keyCode == 32){
  if(showingGameOverScreen){
    showingWinScreen = false;
    showingGameOverScreen = false;
    snakeBody = [
      {x:120, y:240},
      {x:80, y:240}
    ];
    appleX = 440;
    appleY = 240;
    direction = "right";
    document.getElementById('current-score').textContent = 0;
    currentScore = 0;
    }
  }
}

function moveEverything(){
  makeSnakeBodyFollowSnakeHead();
  moveSnakeHead();
}

function drawEverything(){
    highScore = localStorage.getItem('highScore');
    document.getElementById("high-score").textContent = highScore;

    drawCheckerboard();
    drawApple(appleX, appleY);
    drawSnake();
    
    if(snakeBody[0].x === appleX && snakeBody[0].y === appleY){
      randomlyPlaceApple();
      addOneBlockToTheBody()
      addScore();
      createHighScore();
    }

    if(showingGameOverScreen){
      if(gameOver()){
      canvasContext.fillStyle = 'white';
      canvasContext.font = "50px 'Press Start 2P'"
      canvasContext.fillText("GAME OVER", 78, 300);
      canvasContext.font = "15px 'Press Start 2P'"
      canvasContext.fillText("Press Space To Try Again", 120, 350);
      }
      return;
  }
}
      

function addOneBlockToTheBody(){
  snakeBody.push({x:snakeBody[snakeBody.length-1].x, y:snakeBody[snakeBody.length-1].y})
}


function colorRectangle(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}



  function drawApple(appleX, appleY){
    colorRectangle(appleX, appleY, squareSize, squareSize, 'red')
    canvasContext.strokeStyle = "FireBrick";
  canvasContext.strokeRect(appleX, appleY, squareSize, squareSize)
  }

  function randomlyPlaceApple(){
      appleX = generateRandomGridNumber(0, canvas.width, squareSize);
      appleY = generateRandomGridNumber(0, canvas.height, squareSize);
      if(!tellIfSquareIsOccupied(appleX, appleY)){  
      return drawApple(appleX, appleY);
      } 
    };
      

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
    case " ":
      snakeBody[0].y + 0;
  }
}

function makeSnakeBodyFollowSnakeHead(){
  for(let i=snakeBody.length-1; i>0; i--){
      snakeBody[i] = Object.assign({}, snakeBody[i-1])
  }
}

  function drawSnake(){
    for(let i=0; i<snakeBody.length; i++){
    colorRectangle(snakeBody[i].x, snakeBody[i].y, squareSize, squareSize, "palegreen")
    canvasContext.strokeStyle = "DimGray";
    canvasContext.strokeRect(snakeBody[i].x, snakeBody[i].y, squareSize, squareSize)
    }
    
    
  }

function addScore(){
    currentScore += 1;
    document.getElementById("current-score").textContent = currentScore;
}

function createHighScore(){
  if(currentScore > highScore){
    highScore = currentScore;
    document.getElementById("high-score").textContent = highScore;
    localStorage.setItem('highScore', highScore);
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
      canvasContext.strokeStyle = "rgba(0, 0, 0, 0.1)"
      canvasContext.strokeRect(xOffset, yOffset, squareSize, squareSize)
    }
  }
  
  canvasContext.strokeStyle = "black";
  canvasContext.strokeRect(boardTopX, boardTopY, squareSize*15, squareSize*15)
}

function tellIfSquareIsOccupied(objectX, objectY){
 for(let i=1; i<snakeBody.length; i++){
    if(objectX === snakeBody[i].x &&
      objectY === snakeBody[i].y){
    return true
    }
  } 
};


function tellIfSnakeHitBoundary(){
  if(snakeBody[0].x > canvas.width - squareSize ||
    snakeBody[0].x < 0 ||
    snakeBody[0].y > canvas.height - squareSize ||
    snakeBody[0].y < 0 ){
      return true
    } else {
      return false
    }
}

function gameOver(){
  if(tellIfSnakeHitBoundary() || tellIfSquareIsOccupied(snakeBody[0].x, snakeBody[0].y)){ 
    direction = " ";
    showingGameOverScreen = true;
    return true
    }
  }

  const canvas = document.getElementById('gameCanvas');
  const canvasContext = canvas.getContext('2d');
  const squareSize = 40;
  const framesPerSecond = 8;
  let currentScore = 0;
  let highScore = 0;
  let appleX = 440;
  let appleY = 240;
  let snakeMoveByOneSquare = 40;
  let direction ='right';
  let showingStartScreen = true;
  let showingGameOverScreen = false;
  
  
  let snakeBody = [
    {x:120, y:240},
    {x:80, y:240}
  ]

//portal that gives you big bonus multiplier, but reenters you randomly
// after snake body gathers following game-over, hiss animation
//snake jazz background w volume button to turn off