var playSnek = function() {
  var $app = $('#app');
  var $nav = $('#nav');
  var $back = $('<button id="back">Back</button>');
  var $logo = $('#logo');
  var $title = $('title');
  var $canvas = $('<canvas id="myCanvas" width="520" height="630"></canvas>')

  $title.text('Snek!')
  $logo.text('Snek!')
  $app.html('')
  $nav.html('')
  $nav.appendTo($app);
  $back.appendTo($nav);
  $canvas.appendTo($app)

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');



  var x = Math.floor(Math.random() * ((canvas.width - 40) / 40) + 1) * 40 - 20;
  var y = Math.floor(Math.random() * ((canvas.height - 70) / 40) + 1) * 40 + 10;
  var ballRadius = 10;
  var color = 'red'

  var dx = 40;
  var dy = 0;

  var snake = {
    height: 40,
    width: 40,
    dir: 'Right',
    moved: 0,
    length: 3,
  }
  snake.x = 40;
  snake.y = 30;

  var tail = {
    1: {
      height: 40,
      width: 40,
      dir: '',
      moved: 0,
      length: 1,
      x: 40 ,
      y: 30
    },
    2: {
      height: 40,
      width: 40,
      dir: '',
      moved: 0,
      length: 1,
      x: 40,
      y: 30
    }
  };
  var score = 0;
  var speedUp = 0;
  var speed = 200;

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
    var counter = 2;
    var tailClone = {...tail};
    tail[1] = {...snake}
    while (counter <= snake.length) {
      if (tailClone[counter - 1]) {
        tail[counter] = tailClone[counter - 1];
        ctx.beginPath();
        ctx.rect(tail[counter].x, tail[counter].y, tail[counter].width, tail[counter].height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        counter++;
      } else {
        tail[counter] = tailClone[counter - 2];
        ctx.beginPath();
        ctx.rect(tail[counter].x, tail[counter].y, tail[counter].width, tail[counter].height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        counter++;
      }

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
    drawScore();
    collisionDetection();


  }

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" && snake.dir !== 'Left' && snake.moved === 0) {
      dx = 40;
      dy = 0;
      snake.dir = 'Right';
      snake.moved = 1;
    } else if (e.key == "Left" || e.key == "ArrowLeft" && snake.dir !== 'Right' && snake.moved === 0) {
      dx = -40;
      dy = 0;
      snake.dir = 'Left';
      snake.moved = 1;
    } else if (e.key == "Up" || e.key == "ArrowUp" && snake.dir !== 'Down' && snake.moved === 0) {
      dx = 0;
      dy = -40;
      snake.dir = 'Up';
      snake.moved = 1;
    } else if (e.key == "Down" || e.key == "ArrowDown" && snake.dir !== 'Up' && snake.moved === 0) {
      dx = 0;
      dy = 40;
      snake.dir = 'Down';
      snake.moved = 1;
    }
  }

  function newBall() {
    x = Math.floor(Math.random() * ((canvas.width - 40) / 40) + 1) * 40 - 20;
    y = Math.floor(Math.random() * ((canvas.height - 70) / 40) + 1) * 40 + 50;
  }
//  || x > canvas.width || y > canvas.height
  function collisionDetection() {
    if (snake.y < y && snake.y + snake.height > y && snake.x + snake.width > x && snake.x < x) {
      newBall();
      if (snake.y < y && snake.y + snake.height > y && snake.x + snake.width > x && snake.x < x) {
        newBall();
      }
      for (let i = 1; i < snake.length; i++) {
        if ((x > tail[i].x && x < tail[i].x + tail[i].width && y > tail[i].y && y < tail[i].y + tail[i].height)) {
          newBall();
          i = 2;
        }
      }
      score += 10;
      if (score >= 960) {
        alert("YOU WIN! Score: " + score);
        $(document).ready(function() {
          playSnek();
        });
        return
      }
      speedUp += 1;
      if (speedUp >= 5) {
        speedUp = 0;
        speed -= Math.floor(speed * .05);
      }
      snake.length += 2;
    }
    if (snake.y < 30 || snake.y >= canvas.height || snake.x >= canvas.width || snake.x < 0) {
      gameOver();
      return
    }
    for (let i = 3; i <= snake.length; i++) {
      if (tail[i] === undefined ) {
      } else if (snake.x === tail[i].x && snake.y === tail[i].y) {
        gameOver();
        return
      }
    }
    interval = setTimeout(draw, speed);
  }
  function gameOver () {
    alert("GAME OVER! Score: " + score);
    $(document).ready(function() {
      playSnek();
    });
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

  document.addEventListener("keydown", keyDownHandler, false);

  $back.on('click', refresh);

  var interval = setTimeout(draw, speed);

}