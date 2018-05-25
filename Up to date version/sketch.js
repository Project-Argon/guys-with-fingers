let ship, shlep, shlop, shlop2, shlop3, shlop4, pew;
let x, y, shlopX, shlopY;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let junBeoo;
let isShooting;
let theStars = [];
// let flightTime, btTime;
let shootTime, btShoot;
let juns = [];

let shlopTimer, attackTimer, returnTimer, imgTimer, imgMillis;
let moveShlopDown, moveShlopUp;
let moveShlopX;

let shoot;
let flight;

let state, imgState;

function preload() {
  ship = loadImage("assets/Ship.png");
  shlep = loadImage("assets/Shlep.png");
  shlop = loadImage("assets/Shlop.png");
  pew = loadImage("assets/Pew².png");
  junBeoo = loadSound("assets/beoo.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2 - 66;
  y = 600;
  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;

  moveShlopDown = false;
  moveShlopUp = false;
  shlopX = width/2-48;
  shlopY = 150;
  shlopTimer = 2000;
  returnTimer = random(4000, 7000);
  attackTimer = millis();
  imgTimer = 175;
  imgMillis = millis();


  // btTime = 50;
  // flightTime = millis();
  // shootTime = millis();
  // btShoot = 1000;

  shoot = new Timer(0);
  flight = new Timer(50);

  state = 1;
}

function draw() {

  if (flight.isDone()) {
    let aStar = {
      x: random(300, width - 300),
      y: -1,
      c: random(3,6),
      dy: 10,
    };
    theStars.push(aStar);
    flight.reset(50);
  }
  if (shoot.isDone()) {
    if (isShooting) {
      let pews = {
        x: x,
        y: y
      };
      juns.push(pews);
      shoot.reset(1000);
    }
  }
  background(0);
  moveStars();
  displayStars();
  shlopAi();

  if (keyIsPressed) {
    moveShip();
  }
  image(ship,x,y);

  pewpew();
  displayPew();

  fill(255);
  rect(0, - 50, 300, height + 50);
  rect(width-300, - 50, 300, height + 50);
}

class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
    this.finishTime = this.startTime + this.waitTime;
    this.timerIsDone = false;
  }

  reset(newWaitTime) {
    this.waitTime = newWaitTime;
    this.startTime = millis();
    this.finishTime = this.startTime + this.waitTime;
    this.timerIsDone = false;
  }

  isDone() {
    if (millis() >= this.finishTime) {
      return true;
    }
    else {
      return false;
    }
  }
}

function shlopAi() {

  if (imgState === 5) {
    imgState = 1;
  }

  if (millis() > imgMillis + imgTimer) {
    imgMillis = millis();
    imgState += 1;
  }

  if (imgState === 1) {
    image(shlop, shlopX, shlopY, 74, 48);
  }

  if (imgState === 2) {
    image(shlop2, shlopX, shlopY, 74, 48);
  }

  if (imgState === 3) {
    image(shlop3, shlopX, shlopY, 74, 48);
  }

  if (imgState === 4 || imgState === 5) {
    image(shlop4, shlopX, shlopY, 74, 48);
  }

  if (state === 1) {
    moveShlopDown = false;
    if (millis() > attackTimer + returnTimer) {
      moveShlopDown = true;
      attackTimer = millis();
      state = 2;
      moveShlopX = random(0, 3);
    }
  }
  else if (state === 2) {
    moveShlopUp = false;
    if (millis() > attackTimer + shlopTimer) {
      moveShlopUp = true;
      returnTimer = random(3000, 6000);
      attackTimer = millis();
      state = 1;
    }
  }

  if (moveShlopDown) {
    //moveShlopX = int(random(0, 2));
    if (shlopY < height/1.2) {
      if (moveShlopX <= 1) {
        shlopX += 2;
        shlopY += 6;
      }
      if (moveShlopX > 1 && moveShlopX <= 2) {
        shlopX -= 2;
        shlopY += 6;
      }
      if (moveShlopX > 2 && moveShlopX <= 3) {
        shlopY += 6;
      }
    }
  }
  if (moveShlopUp) {
    if (shlopY > 150) {
      if (moveShlopX <= 1) {
        shlopX -= 2;
        shlopY -= 6;
      }
      if (moveShlopX > 1 && moveShlopX <= 2) {
        shlopX += 2;
        shlopY -= 6;
      }
      if (moveShlopX > 2 && moveShlopX <= 3) {
        shlopY -= 6;
      }
    }
  }
}

function pewpew() {
  for (let i=0; i<juns.length; i++) {
    juns[i].y -= 8;
  }
}

function displayPew() {
  for (let i=0; i<juns.length; i++) {
    image(pew, juns[i].x + 48, juns[i].y, 32, 32);
  }
}

function moveStars() {
  for (let i=0; i<theStars.length; i++) {
    theStars[i].y += theStars[i].dy;

    if (theStars[i].y >= height + 50) {
      theStars.splice(i, 1);
    }
  }
}

function displayStars() {

  for (let i=0; i<theStars.length; i++) {
    fill(255);
    noStroke();
    ellipse(theStars[i].x, theStars[i].y, theStars[i].c, theStars[i].c);
  }
}

function keyPressed() {
  if (key === "w" || key === "W") {
    isMovingUp = true;
  }
  else if (key === "s" || key === "S") {
    isMovingDown = true;
  }
  if (key === "a" || key === "A") {
    isMovingLeft = true;
  }
  else if (key === "d" || key === "D") {
    isMovingRight = true;
  }
  if (key === " ") {
    isShooting = true;
  }
}

function moveShip() {
  if (x <= 310) {
    isMovingLeft = false;
  }
  if (x >= width - 442) {
    isMovingRight = false;
  }
  if (y >= height - 106) {
    isMovingDown = false;
  }
  if (y <= 3*height/4) {
    isMovingUp = false;
  }
  if (isMovingUp) {
    y -= 9;
  }
  if (isMovingDown) {
    y += 9;
  }
  if (isMovingLeft) {
    x -= 10;
  }
  if (isMovingRight) {
    x += 10;
  }
}

function keyReleased() {
  if (key === "w" || key === "W") {
    isMovingUp = false;
  }
  if (key === "s" || key === "S") {
    isMovingDown = false;
  }
  if (key === "a" || key === "A") {
    isMovingLeft = false;
  }
  if (key === "d" || key === "D") {
    isMovingRight = false;
  }
  if (key === " ") {
    isShooting = false;
  }
}
