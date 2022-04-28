function River(startX, startY){
  //Data
  this.x = startX;
  this.y = startY;
  this.riverPath = [[mapArray[this.x][this.y]]];

  //Generate the main part of the river
  this.generateMainFlow = function() {
    var c1 = this.riverPath[0].length-1;
    while(c1 < this.riverPath[0].length && this.riverPath[0][c1].z > 127){
      //Find lowestPoint to go to next
      var low = 0;
      for(var n = 0; n < this.riverPath[0][c1].neighbors.length; n++){
        if(this.riverPath[0][c1].neighbors[n].z < this.riverPath[0][c1].neighbors[low].z){
          low = n;
        }
      }
      if(this.riverPath[0][c1].z >= this.riverPath[0][c1].neighbors[low].z){
        this.riverPath[0].push(this.riverPath[0][c1].neighbors[low]);
      }
      c1++;
    }
  }

  //Generate the branches off the main part of the river Same way just with systems to make sure they don't just keep jumping off only to come back
  this.branchOff = function(){
    var count = 0;
    var tempBranch = [];
    var goodBranch = false;

    for(var c = 0; c < this.riverPath[0].length - 1; c++){
      if(abs(this.riverPath[0][c].z - this.riverPath[0][c+1].z) <= riverSplit){
        //Set flag
        goodBranch = true;

        //Set test start
        tempBranch = [this.riverPath[0][c]];

        //Start looping test
        for(var c1 = 0; c1 < riverTestLength; c1++){
          //Find lowest that is not
          var low = 0;
          for(var n = 0; n < tempBranch[c1].neighbors.length; n++){
            if(tempBranch[c1].neighbors[n] !== this.riverPath[0][c+1] && tempBranch[c1].neighbors[n].z <= tempBranch[c1].z && tempBranch[c1].neighbors[n].z < tempBranch[c1].neighbors[low].z){
              low = n;
            }
          }

          //Make sure the next point is lower or equal. if not fail.
          if(tempBranch[c1].neighbors[low].z <= tempBranch[c1].z && tempBranch[c1].neighbors[low] !== this.riverPath[0][c+1]){
            tempBranch.push(tempBranch[c1].neighbors[low]);
          }else{
            goodBranch = false;
            break;
          }
        }

        //If first number of points are good test again
        if(goodBranch){
          for(var sect = 0; sect < this.riverPath.length; sect++){
            for(var main = 0; main < this.riverPath[sect].length && goodBranch; main++){
              for(var test = 1; test < tempBranch.length && goodBranch; test++){
                if(this.riverPath[sect][main] === tempBranch[test]){
                  goodBranch = false;
                }
              }
            }
          }
        }

        //If still good then complete generation
        if(goodBranch){
          //clear tempBranch
          tempBranch = [this.riverPath[0][c]];
          //Start creation loop
          for(var c1 = 0; tempBranch[c1].z > 127; c1++){
            //Find lowest that is not
            var low = 0;
            for(var n = 0; n < tempBranch[c1].neighbors.length; n++){
              if(tempBranch[c1].neighbors[n] !== this.riverPath[0][c+1] && tempBranch[c1].neighbors[n].z <= tempBranch[c1].z && tempBranch[c1].neighbors[n].z < tempBranch[c1].neighbors[low].z){
                low = n;
              }
            }

            //Make sure the next point is lower or equal. if not fail.
            if(tempBranch[c1].neighbors[low].z <= tempBranch[c1].z && tempBranch[c1].neighbors[low] !== this.riverPath[0][c+1]){
              tempBranch.push(tempBranch[c1].neighbors[low]);
            }else{
              break;
            }
          }
          //Add tempBranch to river
          for (var i = 0; i < tempBranch.length; i++) {
            if(i==0){
              this.riverPath.push([tempBranch[i]]);
            }else{
              this.riverPath[this.riverPath.length-1].push(tempBranch[i]);
            }
          }

        }else {
        }

      }
    }
  }

  //Show the river
  this.show = function(){
    //Start of river
    stroke(color("blue"));
    fill(color("blue"));
    strokeWeight(1);
    circle(this.riverPath[0][0].xTrue+this.riverPath[0][0].width/2,this.riverPath[0][0].yTrue+this.riverPath[0][0].height/2,(this.riverPath[0][0].height+this.riverPath[0][0].width)/4);

    //Body of river
    strokeWeight(1.5);
    noFill();
    for(var t = 0; t < this.riverPath.length; t++){
      if(this.riverPath[t].length>1){
        beginShape();
        for(var c = 0; c < this.riverPath[t].length; c++){
          if (c > 0 && dist(this.riverPath[t][c].x,this.riverPath[t][c].y,this.riverPath[t][c-1].x,this.riverPath[t][c-1].y)>2) {//Check if the distence between two points is greater than it should be.
            if(this.riverPath[t][c].x-this.riverPath[t][c-1].x == 0){//Determine in what direction the river makes the jump Up/Down or Left/Right
              if(this.riverPath[t][c-1].y == 0){//Determine if it is jumping Up or Down
                //Make the splice
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width/2,this.riverPath[t][c-1].yTrue);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue+this.riverPath[t][c].height);
              }else{
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width/2,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue);
              }
            }else{
              if(this.riverPath[t][c-1].x == 0){//Determine if its jumping Left or Right
                vertex(this.riverPath[t][c-1].xTrue,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height/2);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
              }else{
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height/2);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
              }
            }
          }
          vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
        }
        endShape();
      }

      //End of trails if it meets the ocean.
      if(this.riverPath[t][this.riverPath[t].length-1].z <= 127 && dist(this.riverPath[t][this.riverPath[t].length-1].x,this.riverPath[t][this.riverPath[t].length-1].y,this.riverPath[t][this.riverPath[t].length-2].x,this.riverPath[t][this.riverPath[t].length-2].y)<=2){
        stroke(color("#287ee0"));
        line(this.riverPath[t][this.riverPath[t].length-1].xTrue+this.riverPath[0][0].width/2,this.riverPath[t][this.riverPath[t].length-1].yTrue+this.riverPath[0][0].height/2,this.riverPath[t][this.riverPath[t].length-2].xTrue+this.riverPath[0][0].width/2,this.riverPath[t][this.riverPath[t].length-2].yTrue+this.riverPath[0][0].height/2);
        stroke(color("blue"));
      }
    }
  }

  this.checkTile = function(x,y){
    for(var section = 0; section < this.riverPath.length; section++){
      for(var tile = 0; tile < this.riverPath[section].length; tile++){
        if(this.riverPath[section][tile].x == x && this.riverPath[section][tile].y == y){
          return true;
        }
      }
    }
    return false;
  }
}
