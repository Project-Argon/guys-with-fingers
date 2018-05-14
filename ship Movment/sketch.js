let ship, shlep, shlop;
let x, y;

function preload() {
  ship = loadImage("assets/Ship.png");
  shlep = loadImage("assets/Shlep.png");
  shlop = loadImage("assets/Shlop.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = 600;
}

function draw() {
  background(0);
  keyPressed();
  image(ship,x,y);
}

function keyPressed() {
  if (key === "d" || key === "D") {
    x += 10;
  }
  if (key === "a" || key === "A") {
    x -= 10;
  }
}
