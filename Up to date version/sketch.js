let ship, shlep, shlop, pew;
let x, y;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let junBeoo;
let isShooting;
let theStars = [];
let flightTime, btTime;
let shootTime, btShoot;
let juns = [];

let shlopTimer, attackTimer, returnTimer;
let moveShlopDown, moveShlopUp;
let shlopX, shlopY;

let shoot;
let flight;

let state;

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
  shlopX = width/2+37;
  shlopY = 150;
  shlopTimer = 1200;
  returnTimer = random(4000, 7000);
  attackTimer = millis();

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

  image(shlop, shlopX, shlopY);

  if (state === 1) {
    moveShlopDown = false;
    if (millis() > attackTimer + returnTimer) {
      moveShlopDown = true;
      attackTimer = millis();
      state = 2;
    }
  }
  else if (state === 2) {
    moveShlopUp = false;
    if (millis() > attackTimer + shlopTimer) {
      moveShlopUp = true;
      returnTimer = random(2000, 10000);
      attackTimer = millis();
      state = 1;
    }
  }

  if (moveShlopDown) {
    if (shlopY < height/1.2) {
      shlopY += 7;
    }
  }
  if (moveShlopUp) {
    if (shlopY > 150) {
      shlopY -= 7;
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
