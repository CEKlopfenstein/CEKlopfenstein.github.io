/*
This file is to contain functions that take a point as input and then determine the correct biome.
*/
function beachCheck(point, percentLevel) {
  if(percentLevel < 0.1){
    //Check if it is neighboring an ocean. If so it is a beach.
    for(var c = 0; c < point.neighbors.length; c++){
      if(point.neighbors[c].z <= 127 && point.neighbors[c].z > 85){
        point.biome = 2;
        return true;
      }
    }

    //Find the neighest Ocean if it is within x then it is a beach.
    var oceanFind = [point];
    var closestDist = 6;
    var closestPoint;
    for(var c = 0; c < oceanFind.length; c++){
      for(var next = 0; next < oceanFind[c].neighbors.length; next++){
        //Check if it is a beach and if it is within range
        if(oceanFind[c].neighbors[next].z <= 127 && dist(point.x,point.y,oceanFind[c].neighbors[next].x,oceanFind[c].neighbors[next].y) < closestDist && dist(point.x,point.y,oceanFind[c].x,oceanFind[c].y) < dist(point.x,point.y,oceanFind[c].neighbors[next].x,oceanFind[c].neighbors[next].y)){
          oceanFind.push(oceanFind[c].neighbors[next]);
          closestDist = dist(point.x,point.y,oceanFind[c].neighbors[next].x,oceanFind[c].neighbors[next].y);
          closestPoint = oceanFind[c].neighbors[next];
        }else if(dist(point.x,point.y,oceanFind[c].neighbors[next].x,oceanFind[c].neighbors[next].y) < closestDist && dist(point.x,point.y,oceanFind[c].x,oceanFind[c].y) < dist(point.x,point.y,oceanFind[c].neighbors[next].x,oceanFind[c].neighbors[next].y)){
          oceanFind.push(oceanFind[c].neighbors[next]);
        }
      }
    }
    if(closestDist < 6){
      point.biome = 2;
      return true;
    }
  }
  //If all fails then it is not a beach.
  return false;
}

function swampCheck(point,percentLevel) {
  if(percentLevel < 0.2){
    point.biome = 3;
    return true;
  }else if (percentLevel < 0.5) {
    for(var river = 0; river < riversArray.length; river++){
      if(riversArray[river].checkTile(point.x,point.y)){
        point.biome = 3;
        var spread = [point];
        var spreadChance = 1-(percentLevel-0.2)/0.3;
        for(var section = 0; section < spread.length; section++){
          for(var c = 0; c < spread[section].neighbors.length; c++){
            if(random() < spreadChance && (spread[section].neighbors[c].z-127)/(highPointFind(mapArray) - 127) < 0.5){
              spread[section].neighbors[c].biome = 3;
              spread.push(point.neighbors[c]);
            }
          }
          spreadChance -= 0.2;
        }
        return true;
      }
    }
  }
  return false;
}

function lowFlatlandsCheck(point,percentLevel) {
  if(percentLevel < 0.5){
    point.biome = 4;
    return true;
  }
  return false;
}

function lowForestCheck(point,percentLevel) {
  if(percentLevel < 0.5 && random() < 0.025){
    point.biome = 5;
    var spread = [point];
    for(var spin = 0; spin < spread.length; spin++){
      for(var side = 0; side < spread[spin].neighbors.length; side++){
        if(dist(point.x,point.y,spread[spin].x,spread[spin].y) < dist(point.x,point.y,spread[spin].neighbors[side].x,spread[spin].neighbors[side].y) && (spread[spin].neighbors[side].z-127)/(highPointFind(mapArray) - 127) < 0.5 && (spread[spin].neighbors[side].z-127)/(highPointFind(mapArray) - 127) >= 0.2 && spread[spin].neighbors[side].biome != 5 && random() < 0.6){
          spread.push(spread[spin].neighbors[side]);
          spread[spin].neighbors[side].biome = 5;
        }
      }
    }
    return true;
  }
  return false;
}

function highFlatlandsCheck(point,percentLevel) {

}

function highForestCheck(point,percentLevel) {

}
