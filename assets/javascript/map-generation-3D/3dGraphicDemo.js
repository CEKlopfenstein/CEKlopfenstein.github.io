/*
This function creates two meshes. One with no color that uses the map height data.
And the other being blue and flat to show the ocean level.
It was a simple demo to make sure the plan would work and is more or less the basis of what came next.
*/
function show3d() {
  //Settings
  camera(canvasSize[0]/2, -300, (height/2) / tan(PI*30.0 / 180.0)+200, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, -1, 0);
  var ocean = true;
  stroke(0);
  fill(155);

  clear();
  background(color("springgreen"));
  for(var xP = 0; xP < mapArray.length-1; xP++){
    beginShape(TRIANGLE_STRIP);
    for(var yP = 0; yP < mapArray[0].length-1; yP++){
      for(var x = 0; x < 2; x++){
        for(var y = 0; y < 2; y++){
          vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,mapArray[xP+x][yP+y].z);
        }
      }
    }
    endShape();
  }

  if(ocean){
    fill(color("blue"));
    stroke(color("blue"));
    for(var xP = 0; xP < mapArray.length-1; xP++){
      beginShape(TRIANGLE_STRIP);
      for(var yP = 0; yP < mapArray[0].length-1; yP++){
        for(var x = 0; x < 2; x++){
          for(var y = 0; y < 2; y++){
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,127);
          }
        }
      }
      endShape();
    }
  }
}


/*
This demo started out as a carbon copy of show3d but with color. Sence then
The color has been tweaked multiple times and now uses a single mesh.
It also has a border around the whole thing that makes it look like it has some depth.
Though it was originally to hide where 2 meshes where joining it was left for look.
I may move the border to its own function eventually.
*/
function show3dColor() {
  //Settings
  stroke(0);
  fill(155);
  clear();
  background(255);

  //Draw the Main mesh.
  for(var xP = 0; xP < mapArray.length-1; xP++){
    beginShape(TRIANGLE_STRIP);
    for(var yP = 0; yP < mapArray[0].length-1; yP++){
      for(var x = 0; x < 2; x++){
        for(var y = 0; y < 2; y++){
          pickColor(mapArray[xP+x][yP+y]);
          if(mapArray[xP+x][yP+y].z > 127){
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,mapArray[xP+x][yP+y].z);
          }else{
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,127);
          }
        }
      }
    }
    endShape();
  }

  //Draw the Border Mesh
  fill(200);
  //Front and Back
  for(var c = 0; c < mapArray.length-1; c++ ){
    beginShape();
    if(mapArray[c][0].z > 127){
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,0);
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,mapArray[c][0].z);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,mapArray[c+1][0].z);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,0);
    }else{
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,0);
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,127);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,127);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,0);
    }
    endShape(CLOSE);
    beginShape();
    if(mapArray[c][mapArray[0].length-1].z > 127){
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,0);
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,mapArray[c][mapArray[0].length-1].z);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,mapArray[c+1][mapArray[0].length-1].z);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,0);
    }else{
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,0);
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,127);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,127);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,0);
    }
    endShape(CLOSE);
  }
  //Sides
  for(var c = 0; c < mapArray[0].length-1; c++){
    beginShape();
    if(mapArray[0][c].z > 127){
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,0);
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,mapArray[0][c].z);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,mapArray[0][c+1].z);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,0);
    }else{
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,0);
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,127);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,127);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,0);
    }
    endShape(CLOSE);
    beginShape();
    if(mapArray[c][mapArray[0].length-1].z > 127){
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,0);
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,mapArray[mapArray[0].length-1][c].z);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,mapArray[mapArray[0].length-1][c+1].z);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,0);
    }else{
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,0);
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,127);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,127);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,0);
    }
    endShape(CLOSE);
  }
  //Bottom
  beginShape();
  vertex(mapArray[0][0].xTrue,mapArray[0][0].yTrue,0);
  vertex(mapArray[mapArray.length-1][0].xTrue,mapArray[mapArray.length-1][0].yTrue,0);
  vertex(mapArray[mapArray.length-1][mapArray[0].length-1].xTrue,mapArray[mapArray.length-1][mapArray[0].length-1].yTrue,0);
  vertex(mapArray[0][mapArray[0].length-1].xTrue,mapArray[0][mapArray[0].length-1].yTrue,0);
  endShape(CLOSE);
}

/*
This is the testing color profile. Tweaks will be made to this and once a good result is found a copy will be placed
below it. This is so that I have something to fall back on it I screw something up big time.
*/
function pickColor(point) {
  noStroke();
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        fill(color("grey"));
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          fill(color("#fad355"));
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      fill(color(20,150+(point.z-127)*(100/(highestPoint-127)),20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}

/*
This was the color profile I started with. Most changes that have dome are to the green and how it is done.
Though more may come in future. This is littery the oh shit backup. If all the others get shitted on this gives
atleast something of a base.
*/
function plainColor(point) {
  noStroke();
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        fill(color("grey"));
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          fill(color("#fad355"));
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      fill(color("green"));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}

/*
This one replaces the standard green with a green that varies per triangle based on a random number.
This gives it a folleage look but doesn't help with depth perception like I had originally hoped. Looks
ok though and so I kept it.
*/
function randomGreen(point) {
  noStroke();
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        fill(color("grey"));
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          fill(color("#fad355"));
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      fill(color(20,150+random(10)*10,20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}

/*
This is the current color model and makes the green brighter as it does up. Makes the depth more apparent.
*/
function greenGrad(point) {
  noStroke();
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        fill(color("grey"));
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          fill(color("#fad355"));
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      fill(color(20,150+(point.z-127)*(100/(highestPoint-127)),20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}

/*
The blow are different camera points. There names are self explanitory.
*/
function topCamera() {
  camera(canvasSize[0]/2, -canvasSize[1]*0.75, 450, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
  noLoop();
}
function testCamera(path) {
  var trueFrame = frameCount-startFrame;
  if(trueFrame<path.length-1){
    if(path[trueFrame].z>=127){
      if(path[trueFrame+1].z>=127){
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, path[trueFrame].z+20, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, path[trueFrame+1].z+20, 0, 0, -1);
      }else{
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, path[trueFrame].z+20, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, 147, 0, 0, -1);
      }
    }else{
      if(path[trueFrame+1].z<127){
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, 147, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, 147, 0, 0, -1);
      }else{
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, 147, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, path[trueFrame+1].z+20, 0, 0, -1);
      }
    }
  }else{
    aboveCamera();
    noLoop();
  }
}
function bottomRightPointCam() {
  camera(canvasSize[0]*1.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
  noLoop();
}
function topLeftPointCam() {
  camera(-canvasSize[0]*0.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
  noLoop();
}
function bottomLeftPointCam() {
  camera(-canvasSize[0]*0.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
  noLoop();
}
function topRightPointCam() {
  camera(canvasSize[0]*1.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
  noLoop();
}
function basicPovCamera() {
  var xPoint = floor(mapArray.length/2);
  var yPoint = floor(mapArray[0].length/2);
  if(mapArray[xPoint][yPoint].z<127){
    var camHeight = 127+20;
  }else{
    var camHeight = mapArray[xPoint][yPoint].z+20;
  }
  var camX = mapArray[xPoint][yPoint].xTrue;
  var camY = mapArray[xPoint][yPoint].yTrue;

  camera(camX, camY, camHeight, 0, 0, camHeight, 0, 0, -1);
  noLoop();
}
function panCenterCamera() {
  var trueFrame = frameCount-startFrame+1;
  var xPoint = floor(mapArray.length/2);
  var yPoint = floor(mapArray[0].length/2);
  var lookX = 0;
  var lookY = 0;

  if(mapArray[xPoint][yPoint].z<127){
    var camHeight = 127+20;
  }else{
    var camHeight = mapArray[xPoint][yPoint].z+20;
  }
  var camX = mapArray[xPoint][yPoint].xTrue;
  var camY = mapArray[xPoint][yPoint].yTrue;

  var corner1 = mapSize[0];
  var corner2 = parseInt(mapSize[0])+parseInt(mapSize[1]);
  var corner3 = parseInt(mapSize[0])+parseInt(mapSize[1])+parseInt(mapSize[0]);
  var corner4 = (parseInt(mapSize[0])+parseInt(mapSize[1]))*2;

  if(trueFrame<corner1){
    lookX = trueFrame;
  }else if (trueFrame<corner2) {
    lookX = mapSize[0]-1;
    lookY = trueFrame-corner1;
  }else if (trueFrame<corner3) {
    lookX = mapSize[0]-1-(trueFrame-corner2);
    lookY = mapSize[1]-1;
  }else if (trueFrame<corner4) {
    lookY = mapSize[1]-(trueFrame-corner3)-1;
  }else{
    noLoop();
    console.log("Done");
  }

  camera(camX, camY, camHeight, mapArray[lookX][lookY].xTrue, mapArray[lookX][lookY].yTrue, camHeight, 0, 0, -1);
}
function aboveCamera() {
  camera(canvasSize[0]/2, -canvasSize[1]/2, 600, canvasSize[0]/2, canvasSize[1], 0, 0, 0, -1);
  noLoop();
}
function pathCam(path) {
  var trueFrame = frameCount-startFrame;
  if(trueFrame<path.length-1){
    if(path[trueFrame].z>=127){
      if(path[trueFrame+1].z>=127){
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, path[trueFrame].z+20, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, path[trueFrame+1].z+20, 0, 0, -1);
      }else{
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, path[trueFrame].z+20, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, 147, 0, 0, -1);
      }
    }else{
      if(path[trueFrame+1].z<127){
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, 147, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, 147, 0, 0, -1);
      }else{
        camera(path[trueFrame].xTrue, path[trueFrame].yTrue, 147, path[trueFrame+1].xTrue, path[trueFrame+1].yTrue, path[trueFrame+1].z+20, 0, 0, -1);
      }
    }
  }else{
    aboveCamera();
    noLoop();
  }
}
