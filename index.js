// https://medium.com/dev-compendium/creating-a-bouncing-ball-animation-using-javascript-and-canvas-1076a09482e0
;(function () {
  // global variables that will be loaded/initialized later
  let canvas, ctx, gravity, ball, friction

  // runs once at the beginning
  // loads any data and kickstarts the loop
  function init () {
    // *load data here*
    // our canvas variables
    canvas = document.getElementById('index-screen')
    ctx = canvas.getContext('2d')

    // set the canvas size
    canvas.width = 1200
    canvas.height = 600

    // world/scene settings
    gravity = 0.25
    friction = 0.98

    // starting objects
    ball = {
      bounce: 0.995, // energy lost on bounce (25%)
      radius: 10,
      x: canvas.width / 2,
      y: canvas.height / 2,
      velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
      velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
    }

    // begin update loop
    window.requestAnimationFrame(update)
  }
  iter = 0;
  // draws stuff to the screen
  // allows us to separate calculations and drawing
  function draw () {
    // clear the canvas and redraw everything
    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw the ball (only object in this scene)
    ctx.beginPath()
    //ctx.fillStyle = 'blue'
    R = Math.floor(iter) % 255;
    G = Math.floor(ball.x) % 255;
    B = Math.floor(ball.y) % 255;
    ctx.fillStyle = 'rgb(' + R +', '+ G + ', ' + B + ')';
    ctx.arc(
      ball.x, ball.y,
      ball.radius,
      0, Math.PI * 2
    )
    ctx.fill()
  }

  // the main piece of the loop
  // runs everything
  function update () {
    // queue the next update
    if(iter < 7200)window.requestAnimationFrame(update)

    // logic goes here
	 iter++;
    // bottom bound / floor
    if (ball.y + ball.radius >= canvas.height) {
      ball.velY *= -ball.bounce
      ball.y = canvas.height - ball.radius
      ball.velX *= friction
    }
    // top bound / ceiling
    if (ball.y - ball.radius <= 0) {
      ball.velY *= -ball.bounce
      ball.y = ball.radius
      ball.velX *= friction
    }

    // left bound
    if (ball.x - ball.radius <= 0) {
      ball.velX *= -ball.bounce
      ball.x = ball.radius
    }
    // right bound
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX *= -ball.bounce
      ball.x = canvas.width - ball.radius
    }

    // reset insignificant amounts to 0
    if (ball.velX < 0.01 && ball.velX > -0.01) {
      ball.velX = 0
    }
    if (ball.velY < 0.01 && ball.velY > -0.01) {
      ball.velY = 0
    }

    // add gravity
    ball.velY += gravity

    // update ball position
    ball.x += ball.velX
    ball.y += ball.velY
	 //console.log(ball.x, ball.y);
    // draw after logic/calculations
    draw()
  }

  // start our code once the page has loaded
  document.addEventListener('DOMContentLoaded', init)
})()

