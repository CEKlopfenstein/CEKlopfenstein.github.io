var posX = 0;
var posY = 0;
var speed = 1;
var direction = 0;
var size = 40;
var lastMouseX = 0;
var lastMouseY = 0;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight-5);
  angleMode(DEGREES);
  fill(255);
  stroke(0);
  posX = 5+random(window.innerWidth-5-size*10);
  posY = 5+random(window.innerHeight-5-size*2.5);
  direction = random(360);
  frameRate(30);
  textSize(size);
  fill(0);
}

function draw() {
  if(posX+400 > window.innerWidth){
    direction = newDir(direction,90);
    console.log(round(direction/90)*90);
  }else if(posX < 0){
    direction = newDir(direction,270);
    console.log(round(direction/90)*90);
  }else if(posY+100 > window.innerHeight){
    direction = newDir(direction,0);
    console.log(round(direction/90)*90);
  }else if(posY < 0){
    direction = newDir(direction,180);
    console.log(round(direction/90)*90);
  }
  // Update Position
  if(mouseIsPressed === true){
    clear();
    if(mouseX + 5*size+5 < window.innerWidth && mouseX > 5 + 5*size){
      posX = mouseX-5*size;
    }
    if(mouseY + 1.25*size+5 < window.innerHeight && mouseY > 1.25*size+5){
      posY = mouseY-1.25*size;
    }
    direction = random(360);
  }else{
    posX = speed * sin(direction) + posX;
    posY = speed * cos(direction) + posY;
  }
  item(posX,posY);
}

function item(x,y){
  fill(255);
  rect(x,y,size*10,2.5*size);
  fill(0);
  text('Work in Progress\nPlace Holder',x+size/2,y+size);  
}

function newDir(travel,normal){
  return (normal+180)-(travel-normal);
}
