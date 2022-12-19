function distence(cord1,cord2) {
    return Math.sqrt((cord1[0]-cord2[0])**2+(cord1[1]-cord2[1])**2)
  }
  
  class rabbit {
    /*
    this.rate
    Affects how fast after first pregnacy they give birth.
    Also affects how many are born at a time. As well as
    how hungry and thirsty the babies are at birth.
    Higher values lead to larger and faster litters that
    can die faster of starvation if the don't find food
    soon. 
  
    this.speed
    Affects movement speed both in travel and turning.
    But also affects how fast they get hungry or thirsty.
  
    this.sight
    Affects how close something has to be for them to react
    to it.
  
    this.growRate
    Affects how fast they grow from being babies to being
    able to breed.
    */
    constructor(parent1,parent2) {
      if (parent2 == 'first'){//For tbe first in the map
        this.timetolive = 10000;//Set time alive for first gen
        //Set gender
        if(parent1 == 'male'){
          this.gender = 'male'
        }else{
          this.gender = 'female'
        }
        this.generation = 1;
        this.sight = 30
        this.speed = 5
        this.rotateSpeed = Math.PI/(5*this.speed);
        this.rate = 1
        this.hunger = 10
        this.thirst = 10
        this.x = random(mapSize[0]/2)
        this.y = random(mapSize[1]/2)
        this.direction = 0 //This is in radians
        this.target = []
        this.growRate = 0.1
        this.growth = 1
        this.father = null
        this.eating = false
        this.nearestPlant = null
      }else{//This will be for natural born
        this.timetolive = 15000;
        if(random(100)>50){
          this.gender = 'male'
        }else{
          this.gender = 'female'
        }
        this.generation = parent1.generation + 1;
        this.sight = (parent1.sight+parent2.sight+random(-1,1))/2
        this.speed = (parent1.speed+parent2.speed+random(-1,1))/2
        this.rotateSpeed = Math.PI/(5*this.speed);
        this.rate = (parent1.rate+parent2.rate+random(-1,1))/2
        this.hunger = 5/parent1.rate
        this.thirst = 5/parent1.rate
        this.x = parent1.x + random(-5,5)
        this.y = parent1.y + random(-5,5)
        this.direction = random()*Math.PI //This is in radians
        this.target = []
        this.growRate = (parent1.growRate+parent2.growRate+random(-1,1))/2
        this.growth = 0.01
        this.father = null
        this.eating = false
        this.nearestPlant = null
        this.targetMark(random(mapSize[0]),random(mapSize[1]))
        if(this.sight <= 0 || this.speed <= 0 || this.rate <= 0 || this.growRate <= 0){
          this.growth = -1;
        }
      }
    }
  
    draw() {
      this.scale = 1*this.growth;
      if(this.gender == "male"){
        fill(color('blue'))
        stroke(color('blue'))
      }else{
        fill(color('red'))
        stroke(color('red'))
      }
      // fill(color('#dea74e'))
      // stroke(color('#dea74e'))
      circle(this.x,this.y,15*this.scale)
      fill(color('white'))
      stroke(color('grey'))
      circle(this.x+7.5*this.scale*Math.sin(this.direction),this.y+7.5*this.scale*Math.cos(this.direction),4*this.scale)
      fill(color('pink'))
      circle(this.x-7.5*this.scale*Math.sin(this.direction),this.y-7.5*this.scale*Math.cos(this.direction),2*this.scale)
    }
  
    move(){
      this.deltaX = this.x-this.target[0]
      this.deltaY = this.y-this.target[1]
      this.distence = Math.sqrt((this.deltaX**2)+(this.deltaY**2))
      this.targetRotation = 0;
      if(this.deltaX<0){
        this.targetRotation = (Math.PI/-2) + Math.asin(this.deltaY/this.distence);
      }else{
        this.targetRotation = (Math.PI/2) + Math.asin(-this.deltaY/this.distence);
      }
      if(Math.abs(this.direction-this.targetRotation)<=this.rotateSpeed){
        this.direction = this.targetRotation
      }else{
        if(this.direction<this.targetRotation){
          this.direction += this.rotateSpeed
        }else if(this.direction>this.targetRotation){
          this.direction -= this.rotateSpeed
        }
        return false
      }
      if(false){
  
      }else if(this.distence<=this.speed){
        this.x = this.target[0]
        this.y = this.target[1]
      }else{
        this.slope = this.deltaY/this.deltaX
        this.changeX = Math.sqrt(this.speed/((this.slope**2) +1))
        if(this.x < this.target[0]){
          this.changeY = this.slope*this.changeX
        }else{
          this.changeX = this.changeX*-1
          this.changeY = this.slope*this.changeX
        }
        this.x = this.x + this.changeX
        this.y = this.y + this.changeY
      }
      if(0 == this.x-this.target[0] && 0 == this.y-this.target[1]){
        return true
      }else{
        return false
      }
    }
  
    targetMark(targetX,targetY){
      this.target = [targetX,targetY]
    }
  
    live(){
      this.closestRabbit = null
      this.disToRabbit = Math.sqrt(mapSize[0]**2+mapSize[1]**2)
      for(var c = 0; c < rabbits.length; c++){
        if(distence([rabbits[c].x,rabbits[c].y],[this.x,this.y])<this.disToRabbit && !(rabbits[c] === this) && rabbits[c].gender != this.gender && rabbits[c].growth == 1){
          this.disToRabbit = distence([rabbits[c].x,rabbits[c].y],[this.x,this.y])
          this.closestRabbit = rabbits[c]
        }
      }
      //Desisions
      if(this.hunger>7 && this.thirst > 7 && this.disToRabbit<this.sight && this.growth == 1 && this.eating==false){//Look for mate
        this.targetMark(this.closestRabbit.x,this.closestRabbit.y)
        if(this.disToRabbit < 5){
          if(this.gender == "female"){
            this.father = this.closestRabbit
            console.log(tick+": Generation: "+this.generation+" Bred with "+this.father.generation)
            this.growth += this.rate*0.000125
          }
          this.hunger -= 2;
        }else{
          if(this.move()){
            this.randomTarget()
          }
        }
      }else if (this.thirst <=7) {//Look for water
        console.log(tick+": water");
        this.thirst = 10;
      }else if (this.hunger <=7 && this.eating==false) {//Look for food
        this.nearPlant = []
        for(var c = 0; c < plants.length; c++){
          if(distence([plants[c].x,plants[c].y],[this.x,this.y])<this.sight && plants[c].growth>2){
            this.nearPlant.push(plants[c])
          }
        }
        if(this.nearPlant.length==0){
          if(this.move()){
            this.randomTarget()
          }
        }else{
          //console.log("Food");
          this.nearestPlant = null
          for(var plant = 0; plant < this.nearPlant.length; plant++){
            if(this.nearestPlant == null){
              this.nearestPlant = this.nearPlant[plant];
            }else if(distence([this.x,this.y],[this.nearestPlant.x,this.nearestPlant.y])>distence([this.x,this.y],[this.nearPlant[plant].x,this.nearPlant[plant].y])){
              this.nearestPlant = this.nearPlant[plant]
            }
          }
          if(distence([this.x,this.y],[this.nearestPlant.x,this.nearestPlant.y])>2.5){
            this.targetMark(this.nearestPlant.x,this.nearestPlant.y)
            this.move()
          }else{
            this.eating = true
          }
        }
      }else if(this.eating==true){
        // console.log("eating");
        if(this.nearestPlant.growth>2){
          this.nearestPlant.growth -= 1
          this.hunger += 0.1
        }else{
          // console.log("Plant is to small");
          this.eating = false
          this.randomTarget()
        }
        if(this.hunger>10){
          // console.log("Done Eating");
          this.eating = false
          this.randomTarget()
        }
      }else{//random action
        if(this.move()){
          this.randomTarget()
        }
      }
  
      //Grow
      if(this.growth<1){
        if(this.growth+this.growRate<=1){
          this.growth += this.growRate
        }else{
          this.growth = 1
        }
      }
  
      //Pregnent
      if(this.growth>1){
        if(this.growth<1.5){
          this.growth += this.rate*0.000125
        }else{
          console.log(tick+": Gave Birth. Having: "+6*this.rate+" of Generation: "+(this.generation+1));
          this.growth = 1
          for(var c = 0; c < 6*this.rate; c++){
            rabbits.push(new rabbit(this,this.father))
          }
          this.father = null
        }
      }
  
      //Toll of life
      this.hunger -= 0.000156/(this.speed/5)
      this.thirst -= 0.0005/(this.speed/5)
      this.timetolive--;
    }
    randomTarget(){
      do {
        var dx = random(-this.sight*4,this.sight*4)
      } while (dx+this.x < 0 || dx+this.x > mapSize[0]);
  
      do {
        var dy = random(-this.sight*4,this.sight*4)
      } while (dy+this.y < 0 || dy+this.y > mapSize[1]);
      this.targetMark(dx+this.x,dy+this.y)
    }
  }
  
  class plant {
    constructor(first) {
      if(first == true){
        this.max = 10
        this.scale = 2
        this.growth = 10
        this.growRate = 0.01
        this.x = random(mapSize[0])
        this.y = random(mapSize[1])
      }else{//Seedlings?
        this.max = 10
        this.spread = 100
        this.speed = 0.01
        this.seed = true;
        this.scale = 2
        this.growth = 0
        this.growRate = 0.01
        this.x = first[0]
        this.y = first[1]
        this.target = [first[0]+random(-this.spread,this.spread),first[1]+random(-this.spread,this.spread)]
      }
    }
    draw(){
      if(this.growth>0){
        fill(color('green'))
        stroke(color('green'))
        circle(this.x,this.y,this.growth*this.scale+2)
      }else if(this.seed){
        fill(color('brown'))
        stroke(color('brown'))
        circle(this.x,this.y,1*this.scale)
      }else if(this.growth == 0){
        fill(color('brown'))
        stroke(color('brown'))
        circle(this.x,this.y,2*this.scale)
      }
    }
    live(){
      if(this.seed){
        this.deltaX = this.x-this.target[0]
        this.deltaY = this.y-this.target[1]
        this.distence = Math.sqrt((this.deltaX**2)+(this.deltaY**2))
        if(this.distence<=this.speed){
          this.x = this.target[0]
          this.y = this.target[1]
        }else{
          this.slope = this.deltaY/this.deltaX
          this.changeX = Math.sqrt(this.speed/((this.slope**2) +1))
          if(this.x < this.target[0]){
            this.changeY = this.slope*this.changeX
          }else{
            this.changeX = this.changeX*-1
            this.changeY = this.slope*this.changeX
          }
          this.x = this.x + this.changeX
          this.y = this.y + this.changeY
        }
        if(0 == this.x-this.target[0] && 0 == this.y-this.target[1]){
          this.seed = false
        }
  
      }else{
        if(this.growth<this.max){
          this.growth += this.growRate
        }else{
          // if(random(1000)>999){
          //   this.growth = 1
          //   return new plant([this.x,this.y])
          // }
        }
      }
      return -1
    }
  }
  
  
  
  
  
  //Loop
  plan = []
  // mapSize = [1280,720]
  //mapSize = [640,480]
  mapSize = [window.innerWidth,window.innerHeight*0.85];
  tick = 0;
  finaltickcount = 1000000;
  graphHold = 0;
  FPS = 0;
  record = [];
  function setup() {
    frameRate(60);
    createCanvas(mapSize[0],mapSize[1])
    plants = []
    record = []
    rabbits = [new rabbit('male','first'),new rabbit('female','first')]
    for(var c = 0; c < rabbits.length; c++){
      rabbits[c].targetMark(random(mapSize[0]),random(mapSize[1]))
      // console.log("Target: "+rabbits[c].target[0]+","+rabbits[c].target[1])
    }
    for(var c = 0; c < Math.floor(mapSize[0]*mapSize[1]/30720); c++){
      plants.push(new plant(true))
    }
    tick = 0;
  }
  
  function draw() {
    //Report frame rate and tick count.
    if(tick%10 == 0){
      FPS = Math.floor(frameRate());
    }
    document.getElementById("count").innerHTML = tick+"/"+finaltickcount+" FPS: "+FPS+" Rabbit Count: "+rabbits.length;
    
    //Make record of current enviorment
    record.push([]);
    record[tick].push(Math.floor(frameRate()));
    for(var c = 0; c < rabbits.length; c++){
      record[tick].push(rabbits[c]);
    }
    
    //Clear the canvas.
    clear();
  
    //Handle the Plants.
    while(plants.length>=250){
      console.log(tick+": Plant Died");
      plants.slice(0,1);
    }
    for(var c = 0; c < plants.length; c++){
      var plantReponse = plants[c].live()
      if(plantReponse != -1){
        plants.push(plantReponse)
      }
      plants[c].draw()
    }
  
    //Handle the rabbits.
    for(var c = 0; c < rabbits.length; c++){
      if(rabbits[c].hunger<=0 || rabbits[c].thirst<=0 || rabbits[c].growth<=0 || rabbits[c].timetolive < 0){
        console.log(tick+": Rabbit Died");
        rabbits.splice(c,1);
        continue
      }
      rabbits[c].draw()
      rabbits[c].live()
      //line(rabbits[c].x,rabbits[c].y,rabbits[c].target[0],rabbits[c].target[1])
      // if(rabbits[c].move()){
      //   console.log("Target: "+rabbits[c].target[0]+","+rabbits[c].target[1])
        // rabbits[c].targetMark(440,random(480))
        // rabbits[c].x = 640
        // rabbits[c].y = 0
      //}
    }
  
    //Handle end points are restarts.
    if(tick>finaltickcount){
      console.log("End");
      noLoop();
      graphs();
      // saveCanvas('Final Charts', 'png');
    }else{
      tick++;
    }
    if(rabbits.length == 0){
      setup();
    }
  
    //Show graph when requested.
    if(graphHold>0){
      graphHold--;
      graphs();
      saveCanvas('Charts at '+tick+" ticks", 'png');
    }
  }
  
  //Draw the values saved in record.
  function graphs(){
    //Settings
    markColor = color("cyan");
    graphSize = [mapSize[0]/2,mapSize[1]/2];
  
    //Draw the 4 graphs background
    fill(color("white"));
    stroke(color("Black"));
    rect(0,0,graphSize[0],graphSize[1]);
    rect(graphSize[0],0,graphSize[0],graphSize[1]);
    rect(0,graphSize[1],graphSize[0],graphSize[1]);
    rect(graphSize[0],graphSize[1],graphSize[0],graphSize[1]);
  
    //Draw the graph for frame rate.
    {
      //Find maxFPS
      var maxFPS = 0;
      for(var c = 0; c < record.length; c++){
        if(maxFPS < record[c][0]){
          maxFPS = record[c][0];
        }
      }
      //Get relative values.
      var pixelsPerFrame = graphSize[1]/maxFPS;
      var pixelsPerTick = graphSize[0]/record.length;
      //Draw FPS count lines
      stroke(color(markColor));
      for(var c = 10; c <= maxFPS; c = c + 10){
        line(0,graphSize[1]-(pixelsPerFrame*c),graphSize[0],graphSize[1]-(pixelsPerFrame*c));
      }
      //Draw Data lines
      stroke(color("black"));
      for(var c = 1; c < record.length; c++){
        line(pixelsPerTick*(c-1),graphSize[1]-(pixelsPerFrame*record[c-1][0]),pixelsPerTick*(c),graphSize[1]-(pixelsPerFrame*record[c][0]));
      }
    }
  
    //Draw Population Graph
    {
      //Find max Population
      var maxPop = 0;
      for(var c = 0; c < record.length; c++){
        if(maxPop < record[c].length-1){
          maxPop = record[c].length-1;
        }
      }
      //Find Pixels per Pop
      var pixelsPerPop = graphSize[1]/maxPop;
      //Draw Population count lines
      stroke(color(markColor));
      for(var c = 10; c <= maxPop; c = c + 10){
        line(graphSize[0],graphSize[1]-(pixelsPerPop*c),2*graphSize[0],graphSize[1]-(pixelsPerPop*c));
      }
      //Draw Tick count Lines
      for(var c = 1000; c <= record.length; c = c + 1000){
        line(pixelsPerTick*c+graphSize[0],0,pixelsPerTick*c+graphSize[0],graphSize[1]);
      }
      //Draw data lines
      stroke(color("black"));
      fill(color("black"));
      textSize(30);
      text('Total', graphSize[0], 30);
      for(var c = 1; c < record.length; c++){
        line(pixelsPerTick*(c-1)+graphSize[0],graphSize[1]-(record[c-1].length-1)*pixelsPerPop,pixelsPerTick*c+graphSize[0],graphSize[1]-(record[c].length-1)*pixelsPerPop);
      }
      var gencolor = ["red","blue","green","navy","tan","darkred"];
      for(var gen = 1; gen < 100; gen++){
        console.log(gencolor[gen%gencolor.length]);
        stroke(color(gencolor[gen%gencolor.length]));
        fill(color(gencolor[gen%gencolor.length]));
        var isthere = false;
        for(var c = 1; c < record.length; c++){
          var lastCount = 0;
          var count = 0;
          for(var c1 = 1; c1 < record[c-1].length; c1++){
            if(record[c-1][c1].generation == gen){
              lastCount++;
            }
          }
          for(var c1 = 1; c1 < record[c].length; c1++){
            if(record[c][c1].generation == gen){
              count++;
            }
          }
          if(count > 0 || lastCount > 0){
            line(pixelsPerTick*(c-1)+graphSize[0],graphSize[1]-lastCount*pixelsPerPop,pixelsPerTick*c+graphSize[0],graphSize[1]-count*pixelsPerPop);
            isthere = true;
          }
        }
        if(isthere){
          text('Gen #'+gen, graphSize[0]+125+(Math.floor(gen/(graphSize[1]/60))*125), 30*(gen%Math.floor((graphSize[1]/60))));
        }
      }
    }
  
    //Draw Genetic Code.
    {
      //Find max value to graph
      var peak = 0;
      for(var c = 0; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          if(peak < record[c][rab].sight){
            peak = record[c][rab].sight;
          }
          if(peak < record[c][rab].rate){
            peak = record[c][rab].rate;
          }
          if(peak < record[c][rab].speed){
            peak = record[c][rab].speed;
          }
          if(peak < record[c][rab].growRate){
            peak = record[c][rab].growRate;
          }
        }
      }
      var pixelsPerVal = graphSize[1]/peak;
      //Marker lines(May not implement)
  
      //Sight Average
      fill(color("red"));
      stroke(color("red"));
      var lastAvg = 0;
      var curAvg = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        lastAvg += record[0][rab].sight;
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          curAvg += record[c][rab].sight;
        }
        curAvg /= record[c].length;
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastAvg,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curAvg);
        lastAvg = curAvg;
      }
  
      //Sight Highest
      var lastHigh = 0;
      var curHigh = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        if(lastHigh < record[0][rab].sight){
          lastHigh = record[0][rab].sight;
        }
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          if(curHigh < record[c][rab].sight){
            curHigh = record[c][rab].sight;
          }
        }
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastHigh,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curHigh);
        lastHigh = curHigh;
      }
  
      //Speed Average
      fill(color("blue"));
      stroke(color("blue"));
      lastAvg = 0;
      curAvg = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        lastAvg += record[0][rab].speed;
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          curAvg += record[c][rab].speed;
        }
        curAvg /= record[c].length;
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastAvg,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curAvg);
        lastAvg = curAvg;
      }
  
      //Speed Highest
      lastHigh = 0;
      curHigh = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        if(lastHigh < record[0][rab].speed){
          lastHigh = record[0][rab].speed;
        }
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          if(curHigh < record[c][rab].speed){
            curHigh = record[c][rab].speed;
          }
        }
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastHigh,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curHigh);
        lastHigh = curHigh;
      }
  
      //Rate Of Preg Avg
      fill(color("green"));
      stroke(color("green"));
      lastAvg = 0;
      curAvg = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        lastAvg += record[0][rab].rate;
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          curAvg += record[c][rab].rate;
        }
        curAvg /= record[c].length;
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastAvg,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curAvg);
        lastAvg = curAvg;
      }
  
      //Rate Of Preg Highest
      lastHigh = 0;
      curHigh = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        if(lastHigh < record[0][rab].rate){
          lastHigh = record[0][rab].rate;
        }
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          if(curHigh < record[c][rab].rate){
            curHigh = record[c][rab].rate;
          }
        }
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastHigh,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curHigh);
        lastHigh = curHigh;
      }
  
      //Growth Avg
      fill(color("navy"));
      stroke(color("navy"));
      lastAvg = 0;
      curAvg = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        lastAvg += record[0][rab].growRate;
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          curAvg += record[c][rab].growRate;
        }
        curAvg /= record[c].length;
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastAvg,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curAvg);
        lastAvg = curAvg;
      }
  
      //Growth Highest
      lastHigh = 0;
      curHigh = 0;
      for(var rab = 1; rab < record[0].length; rab++){
        if(lastHigh < record[0][rab].growRate){
          lastHigh = record[0][rab].growRate;
        }
      }
      lastAvg /= record[0].length-1;
      for(var c = 1; c < record.length; c++){
        for(var rab = 1; rab < record[c].length; rab++){
          if(curHigh < record[c][rab].growRate){
            curHigh = record[c][rab].growRate;
          }
        }
        line(pixelsPerTick*(c-1),2*graphSize[1]-pixelsPerVal*lastHigh,pixelsPerTick*c,2*graphSize[1]-pixelsPerVal*curHigh);
        lastHigh = curHigh;
      }
    }
  }
  
  function mouseClicked(){
    toReturn = []
    for(var c  = 0; c < plants.length; c++){
      if(distence([mouseX,mouseY],[plants[c].x,plants[c].y])<50){
        toReturn.push(plants[c])
      }
    }
  
    for(var c  = 0; c < rabbits.length; c++){
      if(distence([mouseX,mouseY],[rabbits[c].x,rabbits[c].y])<50){
        toReturn.push(rabbits[c])
      }
    }
    console.log(tick+": Around Mouse");
    console.log(toReturn);
  }
  
  function keyReleased(){
    if(keyCode === 32 && graphHold == 0){
      graphHold = 1;
    }
  }

  function windowResized() {
    setup();
  }