var playSnek = function() {
  var $nav = $('#nav')
  var $back = $('<button id="back">Back</button>');
  var $logo = $('#logo');
  var $title = $('title');

  $title.text('Snek!')
  $logo.text('Snek!')
  $nav.html('');
  $back.appendTo($nav);

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');



  var x = Math.floor(Math.random() * ((canvas.width - 20) / 20) + 1) * 20 - 10;
  var y = Math.floor(Math.random() * ((canvas.height - 30) / 20) + 1) * 20 + 20;
  var ballRadius = 5;
  var color = 'blue'

  var dx = 0;
  var dy = 0;

  var snakeHeight = 20;
  var snakeWidth = 20;
  var snakeX = (canvas.width-snakeWidth) / 2;
  var snakeY = (canvas.height-snakeHeight) / 2 + 15;
  var snakeDir = '';
  var snakeMoved = 0;

  var score = 0;

  var refresh = function() {
    document.location.reload();
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  function drawSnake() {
    ctx.beginPath();
    ctx.rect(snakeX, snakeY, snakeWidth, snakeHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(540, 30);
    ctx.stroke();

    snakeMoved = 0;
    snakeX += dx;
    snakeY += dy;

    drawBall();
    drawSnake();
    collisionDetection();
    drawScore();
  }

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" && snakeDir !== 'Left' && snakeMoved === 0) {
      dx = 20;
      dy = 0;
      snakeDir = 'Right';
      snakeMoved = 1;
    } else if (e.key == "Left" || e.key == "ArrowLeft" && snakeDir !== 'Right' && snakeMoved === 0) {
      dx = -20;
      dy = 0;
      snakeDir = 'Left';
      snakeMoved = 1;
    } else if (e.key == "Up" || e.key == "ArrowUp" && snakeDir !== 'Down' && snakeMoved === 0) {
      dx = 0;
      dy = -20;
      snakeDir = 'Up';
      snakeMoved = 1;
    } else if (e.key == "Down" || e.key == "ArrowDown" && snakeDir !== 'Up' && snakeMoved === 0) {
      dx = 0;
      dy = 20;
      snakeDir = 'Down';
      snakeMoved = 1;
    }
  }


  function collisionDetection() {
    if (snakeY < y && snakeY + snakeHeight > y && snakeX + snakeWidth > x && snakeX < x) {
      x = Math.floor(Math.random() * ((canvas.width - 20) / 20) + 1) * 20 - 10;
      y = Math.floor(Math.random() * ((canvas.height - 30) / 20) + 1) * 20 + 20;
      score += 10;
    }
    if (snakeY < 30 || snakeY >= canvas.height || snakeX >= canvas.width || snakeX < 0) {
      alert("GAME OVER");
      // document.location.reload();
      clearInterval(interval);
      $(document).ready(function() {
        playSnek();
      });
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

  document.addEventListener("keydown", keyDownHandler, false);

  $back.on('click', refresh);

  var interval = setInterval(draw, 200);

}