let ship, shlep, shlop, shlop2, shlop3, shlop4, pew;
let x, y, shlopX, shlopY;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let junBeoo;
let isShooting;
let theStars = [];
// let flightTime, btTime;
let shootTime, btShoot;
let juns = [];

let aliens = [];

let attackTimer, shlopTimer, imgTimer, imgMillis;
let moveShlopDown, moveShlopUp;
let moveShlopX;

let shoot, flight, appear;
let hit;

let state, imgState, screenState;

// let returnTimer;

function preload() {
  shlep = loadImage("assets/Shlep.png");
  shlop = loadImage("assets/Shlop.png");
  shlop2 = loadImage("assets/Shlop2.png");
  shlop3 = loadImage("assets/Shlop3.png");
  shlop4 = loadImage("assets/Shlop4.png");
  ship = loadImage("assets/Ship.png");
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
  shlopTimer = 5000;
  // returnTimer = random(4000, 7000);
  attackTimer = millis();
  imgTimer = 175;
  imgMillis = millis();
  hit = false;
  screenState = 2;

  // btTime = 50;
  // flightTime = millis();
  // shootTime = millis();
  // btShoot = 1000;

  shoot = new Timer(0);
  flight = new Timer(50);
  appear = new Timer(0);

  state = 1;
  imgState = 1;
}

function draw() {
  // if (screenState === 1) {
  //
  // }
  if (screenState === 2) {
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
        junBeoo.play();
        let pews = {
          x: x,
          y: y
        };
        juns.push(pews);
        shoot.reset(1000);
      }
    }
    if (appear.isDone()) {
      let aShlop = {
        x: shlopX + random(-300, 300),
        y: shlopY,
        dx: 2,
        dy: 6,
        state: 1,
        timing: attackTimer,
        choice: random(0,3),
      };
      aliens.push(aShlop);
      appear.reset(3000);
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

    moveShlop();
    displayShlop();

    fill(255);
    rect(0, - 50, 300, height + 50);
    rect(width-300, - 50, 300, height + 50);
  }
  if (screenState === 3) {
    background(255);
  }
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

function moveShlop() {
  for (let i=0; i<aliens.length; i++) {
    if (aliens[i].state === 1) {
      if (aliens[i].y < height/1.1) {
        if (aliens[i].choice <= 1) {
          aliens[i].x += aliens[i].dx;
          aliens[i].y += aliens[i].dy;
        }
        if (aliens[i].choice > 1 && aliens[i].choice <= 2) {
          aliens[i].x -= aliens[i].dx;
          aliens[i].y += aliens[i].dy;
        }
        if (aliens[i].choice > 2 && aliens[i].choice <= 3) {
          aliens[i].y += aliens[i].dy;
        }
      }
      if (aliens[i].y >= height/1.1) {
        if (millis() > aliens[i].timing + 1000) {
          aliens[i].state = 2;
          aliens[i].timing = millis();
        }
      }
    }
    if (aliens[i].state === 2) {
      if (aliens[i].y >= 150) {
        if (aliens[i].choice <= 1) {
          aliens[i].x -= aliens[i].dx;
          aliens[i].y -= aliens[i].dy;
        }
        if (aliens[i].choice > 1 && aliens[i].choice <= 2) {
          aliens[i].x += aliens[i].dx;
          aliens[i].y -= aliens[i].dy;
        }
        if (aliens[i].choice > 2 && aliens[i].choice <= 3) {
          aliens[i].y -= aliens[i].dy;
        }
      }
      if (aliens[i].y <= 150) {
        if (millis() > aliens[i].timing + shlopTimer) {
          aliens[i].state = 1;
          aliens[i].timing = millis();
          shlopTimer = random(5000, 7000);
        }
        aliens[i].choice = random(0, 3);
      }
    }
    if (collideRectRect(x,y,132,132,aliens[i].x,aliens[i].y,74,48)) {
      screenState = 3;
    }
  }
}

function displayShlop() {
  for (let i=0; i<aliens.length; i++) {
    if (imgState === 5) {
      imgState = 1;
    }
    if (millis() > imgMillis + imgTimer) {
      imgMillis = millis();
      imgState += 1;
    }
    if (imgState === 1) {
      image(shlop, aliens[i].x, aliens[i].y, 74, 48);
    }
    if (imgState === 2) {
      image(shlop2, aliens[i].x, aliens[i].y, 74, 48);
    }
    if (imgState === 3) {
      image(shlop3, aliens[i].x, aliens[i].y, 74, 48);
    }
    if (imgState === 4 || imgState === 5) {
      image(shlop4, aliens[i].x, aliens[i].y, 74, 48);
    }
    if (aliens.length === 10) {
      aliens.pop();
    }
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
  if (y <= height/1.8) {
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
