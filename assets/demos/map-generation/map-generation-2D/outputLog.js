function logIt() {
  //Format time string.
  var timeTaken = "";
  if(totalTime/3600000>=1){
    if(floor(totalTime/3600000)<10){
      timeTaken += "0"+floor(totalTime/3600000)+":";
    }else{
      timeTaken += floor(totalTime/3600000)+":";
    }
    totalTime -= floor(totalTime/3600000)*3600000;
  }else{
    timeTaken += "00:";
  }
  if(totalTime/60000>=1){
    if(floor(totalTime/60000)<10){
      timeTaken += "0"+floor(totalTime/60000)+":";
    }else{
      timeTaken += floor(totalTime/60000)+":";
    }
    totalTime -= floor(totalTime/60000)*60000;
  }else{
    timeTaken += "00:";
  }
  if(totalTime/1000>=1){
    if(floor(totalTime/1000)<10){
      timeTaken += "0"+floor(totalTime/1000)+".";
    }else{
      timeTaken += floor(totalTime/1000)+".";
    }
    totalTime -= floor(totalTime/1000)*1000;
  }else{
    timeTaken += "00.";
  }
  timeTaken += floor(totalTime)+"";

  //Settings String
  var mapSize = [100,100];
  var pointCount = 5;
  var fallRate = 10;
  var smoothOut = 25;
  //Canvas Size
  var currentSettings = "Canvas Size:\n\tX: "+canvasSize[0]+"\n\tY: "+canvasSize[1]+"\n";
  //Map Size
  currentSettings += "Map Size:\n\tX: "+mapSize[0]+"\n\tY: "+mapSize[1]+"\n";

  //Number of High Points
  currentSettings += "Number of starting Points: "+points+"\n";

  //Rate of fall
  currentSettings += "Drop off rate from starting points: "+fallRate+"\n";

  //Number of smoothing iterations
  currentSettings += "Iterations of smoothing out: "+smoothOut+"\n";

  //Time
  currentSettings += "Time taken: "+timeTaken+"\n";

  return currentSettings;
}

function mapToText(){
  var textMap = "";
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      textMap += floor(mapArray[x][y].z/25.5)+"";
    }
    textMap += "\n";
  }
  return textMap;
}

function trueLogger(data) {
  let logOutput = createWriter(logFile);
  logOutput.write(data+"\n"+mapToText());
  logOutput.close();
}
