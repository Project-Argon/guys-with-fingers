// p5js Asteroids
// Caleb Booker, Chris Van der Spuy, (a.k.a. the grammar nazis)
// Music credited to Mortistar https://www.youtube.com/channel/UCNrF2EMO1_JF0hvwGvFywHg

//Chris made the part of the code that creates the asteroids and sets how they move and appear
//Caleb made the part of the code that controls the ship and its movements and created/modified images (as well as title and game over screens)
//Collision detection, difficulty settings and minor debugging was a group effort
//This project was fun, thanks for being awesome!

let x, y, imgX, imgY;
let gameSound, titleSound, gameoverSound;
let troid, face, dizzy, ship, orb, space, title, over;
let choice;
let theTroids = [];
let flightTime, btTime;
let rotationAngle, state;
let difficultyTimer;


//loads images, sounds, and sets state to 1
function preload() {
  troid = loadImage("Assets/troy.png");
  face = loadImage("Assets/faceless.png");
  dizzy = loadImage("Assets/dizzy.png");
  ship = loadImage("Assets/ship sprite3.png");
  orb = loadImage("Assets/follow orb.png");
  space = loadImage("Assets/cool space2.jpg");
  title = loadImage("Assets/title screen.png");
  over = loadImage("Assets/gameover.png");
  titleSound = loadSound("Assets/Mortistar - Monolith.mp3");
  gameSound = loadSound("Assets/Mortistar - Arcade.mp3");
  gameoverSound = loadSound("Assets/Mortistar - Underground.mp3");
  state = 1;
}

//sets required values and starts title music
function setup() {
  createCanvas(windowWidth, windowHeight);
  btTime = 2000;
  flightTime = millis();
  imgX = width/2;
  imgY = height/2;
  x = 200;
  y = 2000;
  rotationAngle = 0;
  difficultyTimer = 0;
  gameoverSound.loop();
  gameoverSound.setVolume(1.2);
}

//calls all functions and checks state for required functions
function draw() {
  background(0);
  choice = random(0, 3);
  if (state === 1) {
    image(title,0,0,width,height);
    noCursor();
  }
  if (state === 2) {
    image(space,0,0,width,height);
    asteroidTimer();
    moveTroids();
    displayTroids();
    cursor(CROSS);
    shipRotate();
    downwardsAccel();
    upwardsAccel();
    rightAccel();
    leftAccel();
  }
  if (state === 3) {
    image(over,0,0,width,height);
    noCursor();
  }
}

//changes state when required
//deals with sound stuff because i'm lazy
//resets troids if game over and sets spawn amount of asteroids
function keyTyped() {
  if (state === 1) {
    if (key === " ") {
      state = 2;
      gameoverSound.stop();
      gameSound.loop();
    }
  }
  else if (state === 3) {
    if (key === " ") {
      state = 2;
      x = 160;
      y = 1600;
      theTroids.length -= theTroids.length;
      gameoverSound.stop();
      gameSound.loop();
    }
  }
}

//checks position of the mouse and faces ship towards it
//makes passengers of ship dizzy
function shipRotate() {
  angleMode(DEGREES);
  translate(imgX, imgY);
  rotate(rotationAngle);
  image(ship, -33, -33, 70, 42);
  if (imgY < mouseY && mouseX < imgX + 40 && mouseX > imgX - 40) {
    rotationAngle = 180;
  }
  else if (imgX < mouseX && mouseY < imgY + 40 && mouseY > imgY - 40) {
    rotationAngle = 90;
  }
  else if (imgX > mouseX && mouseY > imgY - 40 && mouseY < imgY + 40) {
    rotationAngle = 270;
  }
  else if (imgY > mouseY && mouseX > imgX - 40 && mouseX < imgX + 40) {
    rotationAngle = 0;
  }
  else if (imgX < mouseX && imgY > mouseY) {
    rotationAngle = 45;
  }
  else if (imgX < mouseX && imgY < mouseY){
    rotationAngle = 135;
  }
  else if (imgX > mouseX && imgY < mouseY){
    rotationAngle = 225;
  }
  else if (imgX > mouseX && imgY > mouseY) {
    rotationAngle = 315;
  }
}

//sets acceleration and deccelleration speed for the ship in the function's respective direction
function rightAccel() {
  if (mouseX > imgX + 132) {
    imgX += 7;
  }
  else if (mouseX > imgX + 99) {
    imgX += 6;
  }
  else if (mouseX > imgX + 66) {
    imgX += 4;
  }
  else if (mouseX > imgX + 46) {
    imgX += 2;
  }
}

//sets acceleration and deccelleration speed for the ship in the function's respective direction
function leftAccel() {
  if (mouseX < imgX - 132) {
    imgX -= 7;
  }
  else if (mouseX < imgX - 99) {
    imgX -= 6;
  }
  else if (mouseX < imgX - 66) {
    imgX -= 4;
  }
  else if (mouseX < imgX - 46) {
    imgX -= 2;
  }
}

//sets acceleration and deccelleration speed for the ship in the function's respective direction
function downwardsAccel() {
  if (mouseY > imgY + 132) {
    imgY += 7;
  }
  else if (mouseY > imgY + 99) {
    imgY += 6;
  }
  else if (mouseY > imgY + 66) {
    imgY += 4;
  }
  else if (mouseY > imgY + 46) {
    imgY += 2;
  }
}

//sets acceleration and deccelleration speed for the ship in the function's respective direction
function upwardsAccel() {
  if (mouseY < imgY - 132) {
    imgY -= 7;
  }
  else if (mouseY < imgY - 99) {
    imgY -= 6;
  }
  else if (mouseY < imgY - 66) {
    imgY -= 4;
  }
  else if (mouseY < imgY - 46) {
    imgY -= 2;
  }
}

//keeps the asteroids moving at the same speed at which they started
//erases them from the array once they've left the egde of the screen
function moveTroids() {
  for (let i=0; i<theTroids.length; i++) {
    theTroids[i].x += theTroids[i].dx;
    theTroids[i].y += theTroids[i].dy;

    if (theTroids[i].x <= - 50 || theTroids[i].x >= width + 50) {
      theTroids.splice(i, 1);
    }
  }
}

//displays different asteroids and detects collision between the ship and various asteroids
//keeps the in-game music running without glitching out
function displayTroids() {
  for (let i=0; i<theTroids.length; i++) {
    if (theTroids[i].c <= 1) {
      image(troid, theTroids[i].x - 105/2, theTroids[i].y - 105/2, 105, 105);
      if (collideRectRect(imgX, imgY, 70, 42, theTroids[i].x, theTroids[i].y - 25, 75, 90)) {
        state = 3;
        gameSound.stop();
        gameoverSound.loop();
        gameoverSound.setVolume(1.2);
      }
    }
    else if (theTroids[i].c >= 2) {
      image(face, theTroids[i].x - 50, theTroids[i].y - 50, 100, 100);
      if (collideRectRect(imgX, imgY, 70, 42, theTroids[i].x - 5, theTroids[i].y - 35, 85, 70)) {
        state = 3;
        gameSound.stop();
        gameoverSound.loop();
        gameoverSound.setVolume(1.2);
      }
    }
    else if (theTroids[i].c > 1 && theTroids[i].c < 2){
      image(dizzy, theTroids[i].x - 50, theTroids[i].y - 50, 100, 100);
      if (collideRectRect(imgX, imgY, 70, 42, theTroids[i].x - 5, theTroids[i].y - 30, 75, 100)) {
        state = 3;
        gameSound.stop();
        gameoverSound.loop();
        gameoverSound.setVolume(1.2);
      }
    }

  }
}

//gives information on the asteroids
//variable c randomizes which asteroid is pushed into the array
//sets speed and direction
//causes asteroids to spawn more frequently every 15 seconds
function asteroidTimer() {
  if (millis() > flightTime + btTime) {
    let xs;
    let xl, yl;
    let side = random(100);
    if (side <= 50) {
      xl = 1;
      xs = random(4, 7);
    }
    else if (side > 50) {
      xl = width - 1;
      xs = random(-7, -4);
    }
    yl = random(0, height - 0);

    let aBall = {
      x: xl,
      y: yl,
      c: choice = random(0,3),
      dx: xs,
      dy: random(-2, 2),
    };
    theTroids.push(aBall);
    flightTime = millis();
    btTime = random(x, y);
  }
  if (millis >= difficultyTimer + 15000 && x > 50 && y > 50) {
    difficultyTimer += 15000;
    x += 20;
    y += 20;
  }
}
