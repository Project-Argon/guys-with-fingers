let ship, shlep, shlop, pew;
let x, y;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let isShooting;
let theStars = [];
let flightTime, btTime;
// let shootTime, btShoot;
let juns = [];

let testShoot;

function preload() {
  ship = loadImage("assets/Ship.png");
  shlep = loadImage("assets/Shlep.png");
  shlop = loadImage("assets/Shlop.png");
  pew = loadImage("assets/Pew².png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = 600;
  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;

  btTime = 50;
  flightTime = millis();
  // shootTime = millis();
  // btShoot = 1000;

  testShoot = new Timer(0);
}

function draw() {
  if (millis() > flightTime + btTime) {
    let aStar = {
      x: random(1, width - 1),
      y: -1,
      c: random(3,6),
      dy: 10,
    };
    theStars.push(aStar);
    flightTime = millis();
  }
  if (testShoot.isDone()) {
    if (isShooting) {
      let pews = {
        x: x,
        y: y
      };
      juns.push(pews);
      testShoot.reset(1000);
    }
  }
  background(0);
  moveStars();
  displayStars();

  if (keyIsPressed) {
    moveShip();
  }
  image(ship,x,y);

  pewpew();
  displayPew();
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
  if (isMovingUp) {
    y -= 10;
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
