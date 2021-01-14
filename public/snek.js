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
  var color = 'red'

  var dx = 0;
  var dy = 0;

  var snake = {
    height: 20,
    width: 20,
    dir: '',
    moved: 0,
    length: 1,
  }
  snake.x = (canvas.width-snake.width) / 2;
  snake.y = (canvas.height-snake.height) / 2 + 15;

  var tail = {};
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
    ctx.rect(snake.x, snake.y, snake.width, snake.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawTail() {
    var counter = snake.length;
    var tailClone = {...tail};
    tail[1] = {...snake}
    while (counter > 1) {
      tail[counter] = tailClone[counter - 1];
      ctx.beginPath();
      ctx.rect(tail[counter].x, tail[counter].y, tail[counter].width, tail[counter].height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
      counter--;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(540, 30);
    ctx.stroke();

    snake.moved = 0;
    snake.x += dx;
    snake.y += dy;

    drawBall();
    drawSnake();
    drawTail();
    collisionDetection();
    drawScore();
  }

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" && snake.dir !== 'Left' && snake.moved === 0) {
      dx = 20;
      dy = 0;
      snake.dir = 'Right';
      snake.moved = 1;
    } else if (e.key == "Left" || e.key == "ArrowLeft" && snake.dir !== 'Right' && snake.moved === 0) {
      dx = -20;
      dy = 0;
      snake.dir = 'Left';
      snake.moved = 1;
    } else if (e.key == "Up" || e.key == "ArrowUp" && snake.dir !== 'Down' && snake.moved === 0) {
      dx = 0;
      dy = -20;
      snake.dir = 'Up';
      snake.moved = 1;
    } else if (e.key == "Down" || e.key == "ArrowDown" && snake.dir !== 'Up' && snake.moved === 0) {
      dx = 0;
      dy = 20;
      snake.dir = 'Down';
      snake.moved = 1;
    }
  }


  function collisionDetection() {
    if (snake.y < y && snake.y + snake.height > y && snake.x + snake.width > x && snake.x < x) {
      x = Math.floor(Math.random() * ((canvas.width - 20) / 20) + 1) * 20 - 10;
      y = Math.floor(Math.random() * ((canvas.height - 30) / 20) + 1) * 20 + 20;
      score += 10;
      snake.length++;
    }
    if (snake.y < 30 || snake.y >= canvas.height || snake.x >= canvas.width || snake.x < 0) {
      alert("GAME OVER! Score: " + score);
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