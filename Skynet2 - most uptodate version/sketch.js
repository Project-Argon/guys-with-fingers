//Chris and Caleb
//Comp Sci 30
//2018
//Galaga
//We both worked on the majority of the program together. Caleb took care of assets and sound and Chris did more of the trouble shooting and making sure the basic function were working properly
//We got our "must haves" into this version of the program, but there are a few "nice to haves" that we didn't have the time to get around to
//This has been a great class this semester and we thank you for putting up with us and teaching us

//Variables that control stuff like arrays, images, movement, rate of fire, timers, states and ai
let ship, shlep, shlop, shlop2, shlop3, shlop4, pew, titleScreen, deathScreen;
let x, y, shlopX, shlopY;
let isMovingUp, isMovingDown, isMovingRight, isMovingLeft;
let junBeoo;
let isShooting;
let hit;
let show;
let theStars = [];
let juns = [];
let aliens = [];
let attackTimer, shlopTimer, imgTimer, imgMillis, waitTimer;
let moveShlopDown, moveShlopUp, moveShlopX;
let startButtonFill;
let shoot, flight, appear;
let state, imgState, screenState, aiPicker;
let t, d, v, w, s;
let score, kills, hp, hps;

//Preloading all of our images and giving them variable names
function preload() {
  titleScreen = loadImage("assets/OpenScreen.png");
  deathScreen = loadImage("assets/GameOverScreen.png");
  shlep = loadImage("assets/shlep1.png");
  // shlep2 = loadImage("assets/shlep2.png");
  // shlep3 = loadImage("assets/shlep3.png");
  // shlep4 = loadImage("assets/shlep4.png");
  shlop = loadImage("assets/Shlop.png");
  shlop2 = loadImage("assets/Shlop2.png");
  shlop3 = loadImage("assets/Shlop3.png");
  shlop4 = loadImage("assets/Shlop4.png");
  ship = loadImage("assets/Ship.png");
  pew = loadImage("assets/Pew².png");
  junBeoo = loadSound("assets/beoo.mp3");
}

//Assigning values to all of our variables
function setup() {
  createCanvas(windowWidth, windowHeight);
  t = 5000;
  d = random(5000, 10000);
  v = random(25000, 30000);
  w = 4;
  s = 1000;
  hit = false;
  screenState = 1;
  startButtonFill = 255;
  state = 1;
  imgState = 1;
  hp = 1;
  hps = 3;
  show = false;
  score = 0;
  kills = 0;
  //movement
  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;
  moveShlopDown = false;
  moveShlopUp = false;
  //postion
  shlopX = 2*width/8-48;
  shlopY = height/12;
  x = width/2 - 66;
  y = 600;
  //timers
  shlopTimer = random(d, v);
  attackTimer = millis();
  imgTimer = 175;
  imgMillis = millis();
  shoot = new Timer(0);
  flight = new Timer(50);
  appear = new Timer(t);
  waitTimer = 30000;
}

//The function where evrything happens. We call the different states and what needs to happen at each step of the game
function draw() {
  //Title screen with start button
  if (screenState === 1) {
    image(titleScreen,0,0,width,height);
    noStroke();
    fill(150, 150, 150);
    rect(width/2 - 225, height/2 - 100, 450, 250);
    fill(startButtonFill);
    rect(width / 2 - 210, height / 2 - 85, 420, 220);
    fill(0);
    textSize(windowWidth / 20);
    textAlign(CENTER, CENTER);
    text("start", width / 2, height / 2 + 25);
    fill(255);
    textSize(windowHeight / 20);
    text("A - move left, D - move right, S - move down, W - move up, Space bar - shoot", width / 2, 3*height / 4);
    if (collidePointRect(mouseX, mouseY, width/2 - 225, height/2 - 100, 450, 250)) {
      startButtonFill = [115, 60, 115];
      cursor(HAND);
      if (mouseIsPressed) {
        cursor(ARROW);
        screenState = 2;
        appear.reset(t);
        show = true;
      }
    }
    else {
      startButtonFill = 255;
      cursor(ARROW);
    }
  }

  //Game play screen. We push objects such as stars, pews and aliens into their arrays and call the functions that display assets and allow for control of movements
  if (screenState === 2) {
    textSize(32);
    if (flight.isDone()) {
      //star object
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
        //pews object
        let pews = {
          x: x,
          y: y
        };
        juns.push(pews);
        shoot.reset(s);
      }
    }

    if (appear.isDone()) {
      if (show) {
        attackTimer = millis();
        //aliens object
        let aShlop = {
          x: shlopX,
          y: shlopY,
          iy: shlopY,
          dx: 2,
          dy: w,
          state: 0,
          timing: attackTimer,
          choice: random(0,3),
          life: hp,
          delay: shlopTimer,
        };
        aliens.push(aShlop);
        shlopTimer = random(d, v);
        shlopX += width/8;
        if (shlopX >= 6*width/8) {
          shlopX = 2*width/8 - 48;
          shlopY += height/12;
        }
        appear.reset(0);
        if (aliens.length >= 21) {
          show = false;
          aliens.pop();
          shlopX = 2*width/8-48;
          shlopY = height/12;
        }
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

    moveShlop();
    displayShlop();

    fill(120, 60, 120);
    rect(0, - 50, width/5.5 , height + 50);
    rect(width-width/5.5, - 50, width/5.5, height + 50);

    textAlign(CENTER, CENTER);
    fill(0);
    text("Kills: " + kills, width / 10.5, height / 2 + 50);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Score: " + score, width / 10.5, height / 2 - 50);
  }
  //Game over screen with restart button
  if (screenState === 3) {
    image(deathScreen ,0,0,width,height);
    fill(255);
    text("Refesh page to play again", width / 2, height / 2);
    textAlign(CENTER, CENTER);
  }
}

//The timer class used to time the rate of fire, when each star is pushed into the array, and allowing the aliens to be pushed in as a large group
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

//Allows for the pews to move up at the same rate until it leaves the screen
function pewpew() {
  for (let i=0; i<juns.length; i++) {
    juns[i].y -= 8;

    if (juns[i].y >= height + 50) {
      juns.splice(i, 1);
    }
  }
}

//Shows the actual pews
function displayPew() {
  for (let i=0; i<juns.length; i++) {
    image(pew, juns[i].x + 48, juns[i].y, 32, 32);
  }
}

//Allows the stars to fly down the screen until they exit the screen
function moveStars() {
  for (let i=0; i<theStars.length; i++) {
    theStars[i].y += theStars[i].dy;

    if (theStars[i].y >= height + 50) {
      theStars.splice(i, 1);
    }
  }
}

//Shows the stars which are just white ellipses
function displayStars() {
  for (let i=0; i<theStars.length; i++) {
    fill(255);
    noStroke();
    ellipse(theStars[i].x, theStars[i].y, theStars[i].c, theStars[i].c);
  }
}

//Ai movement. This is the longest and probably most difficult function in this program
function moveShlop() {
  for (let i=0; i<aliens.length; i++) {
    //a timer to make sure that you don't just get a wall of aliens attacking you, but rather that they attack at different and random intervals
    if (aliens.length >= 1) {
      if (aliens[i].state === 0) {
        if (millis() > aliens[i].timing + aliens[i].delay) {
          aliens[i].state = 1;
          aliens[i].timing = millis();
          shlopTimer = random(d, v);
        }
      }
      //attack flight path
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
      //ruturn flight path
      if (aliens[i].state === 2) {
        if (aliens[i].y >= aliens[i].iy) {
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
        if (aliens[i].y <= aliens[i].iy) {
          if (millis() > aliens[i].timing + shlopTimer) {
            aliens[i].state = 1;
            aliens[i].timing = millis();
            shlopTimer = random(5000, 15000);
          }
          //randomized which flight path the alien takes
          aliens[i].choice = random(0, 3);
        }
      }
      //collision between the aliens and the ship. Decreases the ships life with each hit until it reaches zero, then sends you to the game over screen
      if (collideRectRect(x, y + 54, 132, 12, aliens[i].x + 5, aliens[i].y, 64, 38)) {
        aliens.splice(i, 1);
        hps -= 1;
        if (hps <= 0) {
          screenState = 3;
        }
      }
      //once the aliens are hit enough times, they with die and be taken out of the array and adds 1 to your kill count
      if (aliens[i].life <= 0) {
        aliens.splice(i, 1);
        kills += 1;
      }
    }
  }
  for (let i=0; i<aliens.length; i++) {
    for (let j=0; j<juns.length; j++) {
      //collision between the pews and the aliens. Pews are terminated once they hit, increase your score by 100, and lower the health of the alien that was hit by one
      if (collideRectRect(juns[j].x + 48, juns[j].y, 32, 32,aliens[i].x, aliens[i].y + 35, 74, -20)) {
        juns.splice(j, 1);
        aliens[i].life -= 1;
        score += 100;
      }
    }
  }
  //show is a variable that allows for a slight bit of time between waves to give you a chance to breath
  if (show === false) {
    //alien life increases by one with each wave
    if (aliens.length <= 0) {
      hp += 1;
      show = true;
      appear.reset(t);
      //alien speed increases with each wave until a certain point
      if (w < 10) {
        w += 1;
      }
    }
  }
}

//Shows the actaul alien and continues to change to sprit to its next iteration to make it look like that alien is animated
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
  }
}

//Allows for certain key to control the functions of the ship
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

//Sets how the ship moves and the boarders that it isn't allowed to cross
function moveShip() {
  if (x <= width/5.5) {
    isMovingLeft = false;
  }
  if (x >= width/1.36) {
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

//Makes it so that once you press and release a required key that the movement function stops once you've released the key
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
