//First thing to be drawn.
function initDraw() {
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
  textSize(24);
  fill(0);
  text("Terrain Generation Starting",canvasSize[0]/2-140,canvasSize[1]/2-10);
  textSize(12);
  text("0% Complete",canvasSize[0]/2+55,canvasSize[1]/2+5);
}

//This is the function that colors the map
function graphic(xOffset,yOffset) {
  for(var x = 0; x < mapArray.length; x++){
    for(var y = 0; y < mapArray[0].length; y++){
      if(xOffset > 0 && yOffset > 0){
        mapArray[x][y].offset(abs((x+xOffset)%mapArray.length),abs((y+yOffset)%mapArray[0].length));
      }
      //testColor3(mapArray[x][y]);
      testBiome(mapArray[x][y]);
      //testTemp(mapArray[x][y]);
    }
  }
  stroke(0);
  line(0,canvasSize[1]*0.5,canvasSize[0],canvasSize[1]*0.5);
  line(0,canvasSize[1]*0.25,canvasSize[0],canvasSize[1]*0.25);
  line(0,canvasSize[1]*0.75,canvasSize[0],canvasSize[1]*0.75);
}

function testGraphic(xOffset,yOffset) {
  for(var x = 0; x < mapArray.length; x++){
    for(var y = 0; y < mapArray[0].length; y++){
      if(xOffset > 0 && yOffset > 0){
        mapArray[x][y].offset(abs((x+xOffset)%mapArray.length),abs((y+yOffset)%mapArray[0].length));
      }
      if(x < floor(mapArray.length/2)){
        changeMapGrad(mapArray[x][y]);
      }else{
        testColor2(mapArray[x][y]);
      }
    }
  }
}

//Basic coloring of hightmap that gives a look of terrain
function generic(point) {
  if(point.z <= 85){
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.show("#287ee0");
  }else if(point.z <= 137){
    point.show("#fad355");
  }else if(point.z <= 204){
    point.show("green");
  }else{
    mapArray[x][y].show("grey");
  }
}

//Greyscale of the z cord
function greyScale(point) {
  point.show(255-point.z);
}

//The idea here is to make it a transition from blue to green
function testColor1(point) {
  point.show([10,point.z,255-point.z]);
  /*
  Conclusion While it works it does not have a good look. It becomes blobs of green in blue.
  */
}

//Near clone of testColor1 just with lines
function testColor1i1(point) {
  point.grid([10,point.z,255-point.z]);
}

//This promising
//This is what I am going to use.
function testColor2(point) {
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        point.show("grey");
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          point.show("#fad355");
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      point.show("green");
    }
  }else if(point.z <= 85){
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.show("#287ee0");
  }
  /*
  This looks good but I want to see what it looks like when I change the sea level
  */
}

//same as testColor2 but with a changing sea level
function testColor2i2(point) {
  var seaLevel = floor((highestPoint-lowestPoint)/2);
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        point.show("grey");
        break;
      }
    }
  }else if(point.z > seaLevel){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= seaLevel){
          point.show("#fad355");
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      point.show("green");
    }
  }else if(point.z <= seaLevel-42){
    point.show("#0056b8");
  }else if(point.z <= seaLevel){
    point.show("#287ee0");
  }
  /*
  This looks good but I want to see what it looks like when I change the sea level
  */
}

//Shows gradual change in z
function changeMapGrad(point) {
  point.findZChange();
  var mostChange = fallRate;
  point.show(255 - 255*(point.zChange/mostChange));
}

//Shows points when change in z reach an integer
function changeMapPoint(point) {
  point.findZChange();
  var mostChange = fallRate/4;
  for(var c = 1; c <= mostChange; c += 0.25){
    if(point.zChange / 4 == c){
      point.show(255 - 255*(c/mostChange));
      break;
    }
  }
}
function testColor3(point) {
  if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          point.show("#fad355");
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      point.show(color(20,150+(point.z-127)*(100/(highestPoint-127)),20));
    }
  }else if(point.z <= 85){
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.show("#287ee0");
  }
  /*
  This looks good but I want to see what it looks like when I change the sea level
  */
}

//Graphical function to show all rivers.
function riverShow() {
  for(var c = 0; c < riversArray.length; c++){
    riversArray[c].show();
  }
}

//Testing for biomes
function testBiome(point) {
  if(point.z > 127){
    high = highPointFind(mapArray)
    var percentLevel = (point.z-127)/(highPointFind(mapArray) - 127);
    if(beachCheck(point, percentLevel)){
      point.show("#fad355");
    }else if(swampCheck(point,percentLevel)){
      point.show("#00691c");
    }else if(point.biome == 3){
      point.show("#00691c");
    }else if (lowForestCheck(point,percentLevel) && point.biome == -1 || point.biome == 5) {
      point.show("#b59100");
    }else if(lowFlatlandsCheck(point,percentLevel)){
      point.show("#45bf65");
    }else if(percentLevel < 0.9 && point.biome == -1){
      point.show("#71b081");
    }else if(percentLevel <= 1 && point.biome == -1){
      point.show("#696b6a");
    }else{
      for(var c = 1; c <= 10; c++){
        if(point.z == high){
          point.show("red");
          break;
        }
        if(percentLevel < c/10){
          point.show((c/10) * 255);
          break;
        }
      }
    }
  }else if(point.z <= 85){
    point.biome = 0;
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.biome = 1;
    point.show("#287ee0");
  }
}

function testTemp(point) {
  if(point.z > 127){
    point.show((point.getTemp()-1)/3*255);
  }
}
