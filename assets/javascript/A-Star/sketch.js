function setup() {
  //Prevent Draw Loop
  noLoop();

  //Number of cells in the map in both the x and y direction
  size = [100,100];

  //Empty map
  grid = [];

  //Size that the Canvas will be.
  can = [window.innerWidth,window.innerHeight-5];

  //Size that a single cell will be
  cell = [can[0]/size[0],can[1]/size[1]];

  //Set Canvas Size
  createCanvas(can[0],can[1]);

  //Create Empty Grid
  for(var x = 0; x < size[0]; x++){
    grid[x] = new Array(size[1]);
  }

  //Fill Grid With Spots
  for(var x = 0; x < size[0]; x++){
    for(var y = 0; y < size[1]; y++){
      grid[x][y] = new Cell(x,y);
    }
  }

  //Lets Spots find neighbors
  for(var x = 0; x < size[0]; x++){
    for(var y = 0; y < size[1]; y++){
      grid[x][y].addNeighbors(grid);
    }
  }

  //Setup Start and End Spots
  grid[0][0].wall = false;
  grid[size[0]-1][size[1]-1].wall = false;

  //Draw the walls using Spot.dot() Function
  for(var x = 0; x < size[0]; x++){
    for(var y = 0; y < size[1]; y++){
      if(grid[x][y].wall){
        grid[x][y].dot();
      }
    }
  }
}

function draw() {
  //Clear the Canvas
  clear();

  //Run aStar to find path.
  var path = aStar(grid[0][0],grid[size[0]-1][size[1]-1]);
  if(path.length == 2 && path[1] == false){
    setup();
    draw();
  }

  //Draw the walls as dots.
  for(var x = 0; x < size[0]; x++){
    for(var y = 0; y < size[1]; y++){
      if(grid[x][y].wall){
        grid[x][y].dot();
      }
    }
  }

  //Begin drawling the path in green
  noFill();
  stroke(color("Green"));
  strokeWeight((cell[0]+cell[1])/8);
  beginShape();
  for(var c = 0; c < path.length; c++){
    vertex(path[c].x * cell[0] + cell[0] / 2,path[c].y * cell[1] + cell[1] / 2);
  }
  endShape();
}

function windowResized() {
  setup();
  draw();
}