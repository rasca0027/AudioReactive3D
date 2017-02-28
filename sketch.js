var leftPile = [];
var rightPile = [];
var amp;
var amps = [];
var xs = [];
var ys = [];


function preload(){
  img = loadImage("bg2.jpg");
  sun = loadImage("gradient.png");
  sound = loadSound('test.ogg');
}


function setup() {
  createCanvas(800, 600, WEBGL);
  
  sound.play();
  amp = new p5.Amplitude();
  
  pointLight(244, 195, 100, 0, 0.5, -0.1);
  //pointLight(255, 255, 255, 0, 0.5, -0.1);


  // initialize left buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    leftPile.push(building1);
  }

  // initialize right buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    rightPile.push(building1);
  }
  
  var waveform = sound.getPeaks(60);
  
  // initialize horizon
  for (var i=0;i<=60;i++){
    xs[i] = random(60, 100);
    //ys[i] = random(80, 350);
    ys[i] = map(waveform[i], -1, 1, 30, 350);
  }

}

function draw() {
  
  //console.log(amp.getLevel());
  if (frameCount % 3 == 0) {
  var level = amp.getLevel();
    level = map(level, 0, 0.8, 30, 600);
    amps.push(level);
  }
  
  background(0);

  // Draw the plain road.
  
  push();
  translate(0, 200, 0);
  rotateX(-PI / 2);
  texture(img);
  plane(250, 1800);
  rotateX(PI / 2);
  pop();
  
  

  if (frameCount % 2000 == 0) {
    generateMoreBuilding();
  }
  
  // draw sun
  push();
  translate(0, -600, -3500);
  rotateY(HALF_PI);
  texture(sun);
  sphere(650);
  pop();
  
  // something on the horizon
  push();
  translate(-1600, 100, -2900);
  ambientMaterial(20, 237, 220);
  box(1500, 10, 10);
  for (var i=0;i<=60;i++) {
    translate(50, 0, 0);
    ambientMaterial(20, 237, 220);
    box(xs[i], ys[i], 10);
    push();
    translate(0, 0, 100);
    fill(0);
    box(xs[i]-10, ys[i]-10, 10);
    pop();
  }
  pop();
  
  
  // camera
  if (sound.isPlaying()) {
    camera(0, 0, -frameCount % 1000 * 10 - 100);
  } else {
    camera(0, 0, 0);
  }
  
  // Draw the plain road.
  translate(0, 180, 0);
  rotateX(-PI / 2);
  texture(img);
  plane(250, 1200);
  //plane(3000, 1000);
  rotateX(PI / 2);
  
  

  

  // Draw Builidngs on left-hand side!
  push();

  translate(-500, 100, -200);
  for (var item = 0; item < leftPile.length; item++) {
    translate(0, 0, -560);
    push();
    translate(0, -leftPile[item].height / 2, 0);
    leftPile[item].display(item);
    pop();
  }

  pop();

  // Draw Builidngs on righthand side!
  push();

  translate(500, 100, -300);
  for (var item = 0; item < rightPile.length; item++) {
    translate(0, 0, -600);
    push();
    translate(0, -rightPile[item].height / 2, 0);
    rightPile[item].display(item);
    pop();
  }

  pop();
  
  // draw white dots
  push();
  translate(180, 0, 50);
  //fill(191, 128, 255);
  ambientMaterial(255);
  for(var i=0; i<=600; i++) {
    translate(0, 0, -180);
    sphere(5);
  }
  pop();
  // draw white dots 2
  push();
  translate(-180, 0, 50);
  //fill(191, 128, 255);
  for(var i=0; i<=600; i++) {
    translate(0, 0, -180);
    sphere(5);
  }
  pop();
  // draw white dots 3
  /*
  push();
  translate(220, 0, 50);
  //fill(191, 128, 255);
  for(var i=0; i<=30; i++) {
    translate(0, 0, -150);
    sphere(4);
  }
  pop();
  */
  // draw white dots 4
  /*
  push();
  translate(-220, 0, 50);
  //fill(191, 128, 255);
  for(var i=0; i<=30; i++) {
    translate(0, 0, -150);
    sphere(4);
  }
  pop();
  */




}


function Building() {

  this.height;

  this.display = function(item) {
    if (item >= amps.length) {
      this.height = 0;      
    } else {
      this.height = amps[item];
    }
    ambientMaterial(113, 66, 244);
    box(60, this.height, 60);
    
  }

}

function generateMoreBuilding() {
  
  console.log("generated, ");
  
  // initialize left buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    leftPile.push(building1);
  }

  // initialize right buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    rightPile.push(building1);
  }
  
}


function newCarpet() {
  // Draw the plain road.
  push();
  translate(0, 180, 0);
  rotateX(-PI / 2);
  texture(img);
  plane(250, 1200);
  //plane(3000, 1000);
  pop();
  
}