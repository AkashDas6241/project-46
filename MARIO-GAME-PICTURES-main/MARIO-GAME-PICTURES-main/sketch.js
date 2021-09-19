var  mario, mario_running, mario_collided;
var ground, invisibleGround, groundImg;
var bgImg;
var obstacle, obstacleImg;
var brick, brickImg, brickGroup;
var score = 0

function preload(){
    mario_running = loadAnimation("mario00.png", "mario01.png", "mario03.png");
    mario_collided = loadImage("collided.png")

    groundImg = loadImage("ground2.png");

    bgImg = loadImage("bg.png");

    brickImg = loadImage("brick.png");
}

function setup(){
    createCanvas(600,350);
    mario = createSprite(50,295,20,50);
    mario.addAnimation("running", mario_running);
    mario.addAnimation("collided", mario_collided);
    mario.scale = 2;

    ground = createSprite(200,330,400,20);
    ground.addImage(groundImg);
    ground.velocityX = -6

    invisibleGround = createSprite(300,300,600,10);
    invisibleGround.visible = false;
    
    brickGroup = new Group();

}
function draw(){
    background(bgImg);

    mario.collide(invisibleGround);

    if(keyDown ("space") && mario.y >=256){
        mario.velocityY = -12
    }

    if(ground.x <0){
        ground.x = ground.width/2;
    }
    mario.velocityY = mario.velocityY +0.8;

    spawnBricks();
    console.log(mario.y);

    for(var i = 0; i<brickGroup.length; i++){
        if(brickGroup.get(i). isTouching(mario)){
            brickGroup.get(i).remove();
            score = score+1
        }
    }
    
    textSize(20);
    fill ("black");
    text("score = " +score, 450,30);

    drawSprites()

}
function spawnBricks(){
    if(frameCount % 60 === 0){
        brick = createSprite(600,120,40,10);
        brick.addImage(brickImg);
        brick.velocityX = -5;
        brick.y = Math.round(random(150,200));
        brick.lifetime = 150;
        brickGroup.add(brick);
        mario.depth = brick.depth +1;
     }
}