var hypnoticBall, database;
var position;
var bg


function preload(){
  bg=loadImage("citybackground.png")
  h=loadImage("helicopter3.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(windowWidth,windowHeight);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addImage(h)


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
x:hypnoticBall.x+x,
y:hypnoticBall.y+y



  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database ");
}
