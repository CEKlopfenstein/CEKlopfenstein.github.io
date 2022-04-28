//Basic mapFilling
function mapSet(){
  //Start Timer
  startTime = millis();

  //Fill mapArray
  for(var x = 0; x < mapSize[0]; x++){
    mapArray.push([]);
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x].push(new Cell(x,y,cellDem[0],cellDem[1]));
    }
  }

  //addNeighbors
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x][y].addNeighbors(mapArray);
    }
  }

  //Make Random High Points
  for(var c = 0; c < pointCount; c++){
    highPointCords.push([floor(random()*mapSize[0]),floor(random()*mapSize[1])]);
    mapArray[highPointCords[c][0]][highPointCords[c][1]].z = 255;
  }

  //Determine cell size
  var cellSide = Math.floor(255/fallRate);

  //Sort Values
  var cellNum = [];
  var cellCount = 0;

  //Sort highPoints into cells
  for(var x = 0; x < mapSize[0]; x += cellSide){
    for(var y = 0; y < mapSize[1]; y += cellSide){
      for(c in highPointCords){
        if((highPointCords[c][0] >= x && highPointCords[c][0] < x+cellSide)&&(highPointCords[c][1] >= y && highPointCords[c][1] < y+cellSide)){
          cellNum.push(cellCount);
        }
      }
    }
    cellCount++;
  }

  //Add highPoints to there own list determined by their cellNum
  //Create lists
  for(var c = 0; c <= cellNum[cellNum.length-1]; c++){
    divHighPoints.push([]);
  }
  //Add to lists
  for(c in highPointCords){
    divHighPoints[cellNum[c]].push(highPointCords[c]);
  }

  //Sort list
  var sortedList = [];
  while(divHighPoints.length>0){
    var most = 0;
    for(c in divHighPoints){
      if(divHighPoints[c].length > divHighPoints[most].length){
        most = c;
      }
    }
    sortedList.push(divHighPoints[most]);
    divHighPoints.splice(most,1);
  }
  divHighPoints = sortedList;

}

//Smooth out the map by making the hight of each cell the average of those arround it
function smoothMap() {
  for(var t = 0; t < smoothOut; t++){
    for(var x = 0; x < mapSize[0]; x++){
      for(var y = 0; y < mapSize[1]; y++){
        sum = 0;
        for(var c = 0; c < mapArray[x][y].neighbors.length; c++){
          sum += mapArray[x][y].neighbors[c].z;
        }
        mapArray[x][y].z = floor(sum/4);
      }
    }
  }
}

//River Generation
function riverGen() {
  //Pick Starting points of rivers and add them to array
  var c = 0;
  while(c < riverStarts){
    var pickX = floor(random(mapSize[0]));
    var pickY = floor(random(mapSize[1]));
    if(mapArray[pickX][pickY].z>127){
      riversArray.push(new River(pickX,pickY));
      riversArray[c].generateMainFlow();
      riversArray[c].branchOff();
      c++;
    }
  }
}

function biomeGeneration() {
  for(var x = 0; x < mapArray.length; x++){
    for(var y = 0; y < mapArray[0].length; y++){
      //Biome Selection
      mapArray[x][y].biomeGen();
    }
  }
}
