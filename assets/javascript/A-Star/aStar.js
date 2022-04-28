function aStar(start,end) {
  //This H can be adjusted and is the estamated cost from a to b
  this.h = function(a,b){
    return dist(a.x,a.y,b.x,b.y);
  }

  //This G can be adjusted and is the true cost from start to b where a is the current point
  this.g = function(a,b){
    return a.g + dist(b.x,b.y,a.x,a.y);
  }

  //Preparing openSet and closedSet
  var openSet = [];
  var closedSet = [];

  //Add start to openSet
  openSet.push(start);

  //Variable that will store the final spot in the path
  var finalSpot;

  //Time that the calulations started
  var starttime = millis();

  while(openSet.length > 0){

    var lowestF = 0;//Assume First index contains the lowest

    for(var c = 0; c < openSet.length; c++){//Find the true Lowest
      if(openSet[c].f < openSet[lowestF].f){
        lowestF = c;
      }
    }

    //Set current to cell in openSet with lowestF
    var current = openSet[lowestF];

    //Check if the current is the End
    if(current == end){
      //Print out the time it took
      var timetook = (millis()-starttime);
      console.log("Found. Took "+Math.floor(timetook/6000)+":"+(Math.floor(timetook/1000)-Math.floor(timetook/6000)*6000)+":"+(timetook-Math.floor(timetook/1000)*1000)+"ms");
      break;
    }

    //Add current to closedSet
    closedSet.push(current);

    //Rmove current from openSet
    openSet.splice(openSet.indexOf(current),1);

    //Find neighbors of current and process them
    var curNei = current.neighbors;

    for(var c = 0; c < curNei.length; c++){
      //If current is not in the closedSet and it is not a wall
      if(!closedSet.includes(curNei[c]) && !curNei[c].wall){
        //Find the predicted G value
        var tempG = this.g(current,curNei[c]);
        //If the current is in openSet compare it to the old G value
        if(openSet.includes(curNei[c]) && tempG < curNei[c].g){
          curNei[c].g = tempG;
          curNei[c].cameFrom = current;
        }else if(!openSet.includes(curNei[c])){//If current is not found in openSet then set G value
          curNei[c].g = tempG;
          curNei[c].cameFrom = current;
          openSet.push(curNei[c]);
        }
        //Find H
        curNei[c].h = this.h(curNei[c],end);

        //Find F
        curNei[c].f = curNei[c].h + curNei[c].g;
      }
    }
  }//End of Loop when openSet.length > 0

  //Check if no solution was found
  if (openSet.length==0) {
    console.log("No Solution");

    //Find end of path that was the closest to the target.
    var lowestH = 0;
    for(var c = 0 ; c < closedSet.length; c++){
      if(closedSet[c].h < closedSet[lowestH].h || closedSet[lowestH].h == 0 ){
        lowestH = c;
      }
    }

    //Return the end of the path
    finalSpot = closedSet[lowestH];
    return [finalSpot, false];
  }
  //Return the end of the path
  finalSpot = current;

  //Find the path
  //Set lead to finalSpot
  var lead = finalSpot;

  //Make an empty array for the path that will be returned
  var returnPath = [];

  //Fill returnPath
  while(lead.cameFrom){
    //Add current finder to the list
    returnPath.push(lead);
    //Set finder the the cameFrom value of the last finder Spot
    lead = lead.cameFrom;
  }

  //Add last spot to returnPath
  returnPath.push(lead);

  //return the path
  return returnPath;
}
