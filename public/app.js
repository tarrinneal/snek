$(document).ready(function() {


  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var x = canvas.width/2;
  var y = canvas.height-30;
  var ballRadius = 10;
  var color = 'blue'

  var dx = 2;
  var dy = -2;

  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth) / 2;

  var rightPressed = false;
  var leftPressed = false;

  function colorChange() {
    var colors = ['red', 'blue', 'black', 'grey', 'green', 'yellow', 'brown', 'purple', 'orange'];
    var random = Math.floor(Math.random() * colors.length);
    color = colors[random];
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += dx;
    y += dy;

    if(x > paddleX && x < paddleX + paddleWidth && y + ballRadius >= canvas.height - paddleHeight) {
      dy = -dy;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
      colorChange()
    } else if (y + dy > canvas.height - ballRadius) {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
      colorChange()
    }
    if (rightPressed) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }

    drawBall();
    drawPaddle();
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
  }


  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  var interval = setInterval(draw, 10);

});
