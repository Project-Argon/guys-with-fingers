
let theStars = [];
let flightTime;
let btTime;

function setup() {
  createCanvas(windowWidth, windowHeight);

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
