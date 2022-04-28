function Cell(xCord, yCord, xDem, yDem){
  //Variables
  this.x = xCord;
  this.y = yCord;
  this.z = 0;
  this.width = xDem;
  this.height = yDem;
  this.xTrue = xCord*xDem;
  this.yTrue = yCord*yDem;
  this.neighbors = [];
  this.zChange = 0;
  this.biome = -1;

  //Initialization

  //Functions
  this.show = function(col) {
    fill(color(col));
    stroke(color(col));
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.grid = function(col) {
    fill(color(col));
    stroke(0);
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.addNeighbors = function(world){
    //Left
    if(this.x != 0){
      this.neighbors.push(world[this.x-1][this.y]);
    }else{
      this.neighbors.push(world[world.length-1][this.y]);
    }

    //Top
    if(this.y != 0){
      this.neighbors.push(world[this.x][this.y-1]);
    }else{
      this.neighbors.push(world[this.x][world[0].length-1]);
    }

    //Bottom
    if(this.y != world[0].length-1){
      this.neighbors.push(world[this.x][this.y+1]);
    }else{
      this.neighbors.push(world[this.x][0]);
    }

    //Right
    if(this.x != world.length-1){
      this.neighbors.push(world[this.x+1][this.y]);
    }else{
      this.neighbors.push(world[0][this.y]);
    }
  }

  this.flowOut = function(){
    for(var c = 0; c < this.neighbors.length; c++){
      if(this.neighbors[c].z < this.z && this.z - fallRate > 0){
        this.neighbors[c].z = this.z - fallRate;
        this.neighbors[c].flowOut();
      }
    }
  }

  this.offset = function(xCord,yCord) {
    this.x = xCord;
    this.y = yCord;
    this.xTrue = xCord*xDem;
    this.yTrue = yCord*yDem;
  }

  this.findZChange = function(){
    var sum = 0;
    for(x in this.neighbors){
      sum += abs(this.neighbors[x].z - this.z);
    }
    this.zChange = sum / 4;
  }

  this.getTemp = function(){
    distToEqu = Math.min(abs(this.y - 0.25*mapSize[1]),abs(this.y - 0.75*mapSize[1]))/(0.25*mapSize[1]);
    if(distToEqu < 1/3){
      return 1;
    }else if(distToEqu < 2/3){
      return 2;
    }else if(distToEqu <= 1){
      return 3;
    }
  }

  this.biomeGen = function(){
    if(this.z > 127){
      if((point.z-127)/(highPointFind(mapArray) - 127)< 0.1){
        this.biome = 2
      }else{
        this.biome = 3;
      }
    }else if(mapArray[this.x][this.y].z <= 85){
      this.biome = 0;
    }else if(mapArray[this.x][this.y].z <= 127){
      this.biome = 1;
    }
  }

}
