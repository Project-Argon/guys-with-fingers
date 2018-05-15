let ship, shlep, shlop;
let x, y;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let theStars = [];
let flightTime;
let btTime;

function preload() {
  ship = loadImage("assets/Ship.png");
  shlep = loadImage("assets/Shlep.png");
  shlop = loadImage("assets/Shlop.png");
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
  background(0);
  moveStars();
  displayStars();

  if (keyIsPressed) {
    moveShip();
  }
  image(ship,x,y);
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
}

function moveShip() {
  if (isMovingUp) {
    y -= 10;
  }
  if (isMovingDown) {
    y += 10;
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
}
