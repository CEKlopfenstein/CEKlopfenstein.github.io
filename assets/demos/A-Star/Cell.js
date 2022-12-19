//Hold information that gets called by on aStar
function Cell(xCord,yCord){
  //Set the cords
  this.x = xCord;
  this.y = yCord;

  //Set starting values to 0
  this.f = 0;
  this.g = 0;
  this.h = 0;

  //Make neighbors array to hold surrouding cells.
  this.neighbors = [];

  //Prepare variable to hold the path
  this.cameFrom;

  //Set default value of whether this cell can be passed or not
  this.wall = false;

  //Randomly select if the cell is not passable
  if(random()<0.5){
    this.wall = true;
  }

  //Function to cause the cell to be colored in
  this.show =  function(col) {
    fill(col);
    noStroke();
    rect(this.x * cell[0], this.y * cell[1], cell[0], cell[1]);
  }

  //Function to make the cell vissable as a dot. Typically used for when this.wall is true
  this.dot = function(){
    fill(0);
    noStroke();
    ellipse(this.x * cell[0] + cell[0] / 2, this.y * cell[1] + cell[1] / 2, cell[0] / 2, cell[1] / 2);
  }

  //Function that finds the neighbors and fills the array.
  this.addNeighbors = function(world){
    //Bottom Right
    if(this.x + 1 < size[0] && this.y + 1 < size[1]){
      this.neighbors.push(world[this.x+1][this.y+1]);
    }

    //Top Left
    if(this.x > 0 && this.y > 0){
      this.neighbors.push(world[this.x-1][this.y-1]);
    }

    //Bottom Left
    if(this.x > 0 && this.y + 1 < size[1]){
      this.neighbors.push(world[this.x-1][this.y+1]);
    }

    //Top Right
    if(this.y > 0 && this.x + 1 < size[0]){
      this.neighbors.push(world[this.x+1][this.y-1]);
    }

    //Right
    if(this.x + 1 < size[0]){
      this.neighbors.push(world[this.x + 1][this.y]);
    }

    //Bottom
    if(this.y + 1 < size[1]){
      this.neighbors.push(world[this.x][this.y + 1]);
    }

    //Left
    if(this.x > 0){
      this.neighbors.push(world[this.x - 1][this.y]);
    }

    //Top
    if(this.y > 0){
      this.neighbors.push(world[this.x][this.y - 1]);
    }
  }
}
