//declaring variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg, endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //loading images and animations
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  //creating groups
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  background(0);
  //making boy move with mouse
  if(gameState===PLAY){
    boy.x = World.mouseX;
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
    //calling functions
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    //incrementing score and destroying sprites, and setting gamestate to end
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection+=25;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection+=50;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection+=75;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END;  
      }
    }
  }
  
  
  
  
  
  //creating edges sprites and making boy collide with edges
  edges= createEdgeSprites();
  boy.collide(edges);
  

  //resetting boy, ground, and destroying groups
  if(gameState===END){
    boy.addAnimation("SahilRunning",endImg);
    boy.scale=1;
    boy.x=200;
    boy.y=200;
    boy.velocityY=0;
    path.velocityY=0;
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    cashG.destroyEach();
    swordGroup.destroyEach();
  }
  //displaying score and drawing sprites
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
}
//functions to create treasures
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),0, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),0, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),0, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),0, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}