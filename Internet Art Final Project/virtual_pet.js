function preload() {
    
}

var canvasHeight = 600;
var canvasWidth = 600;
var bgColor = '#320F21'
var buttonColor = "#FF9622"
var button1x = 100;
var button1y = 100;
var floorHeight = 100;
var floorWidth = canvasWidth;
var wallWidth = 10;
var foodColor = "#CDA273";
var foodDiameter = 10;
var homeHeight = 40;
var petSize = 60;
var playerSize = 30;
var floorColor = "#11424C";
var petColor = "#A378C9";
var wallColor = "#2E2E2E"
let floor,food, pet, lWall, rWall, ceiling, ball, home, player;
var foodExists = false;
var ballExists = false;
var followMouse = false;

function setup() {
    new Canvas(canvasWidth, canvasHeight);
    noStroke();

    world.gravity.y = 9;
    
    var normalFace = loadImage('images/normalface.png');
    var happyFace = loadImage('images/happyface.png')
    floor = new Sprite(canvasWidth/2, canvasHeight - .5*floorHeight, floorWidth, floorHeight,'static');
    lWall = new Sprite(0, canvasHeight/2, wallWidth, canvasHeight, 'static');
    rWall = new Sprite(canvasWidth, canvasHeight/2, wallWidth, canvasHeight,'static');
    ceiling = new Sprite(canvasWidth/2,0,canvasWidth, wallWidth, 'static');

    //create background sprite

    // background = new Sprite (0,0, canvasWidth, canvasHeight, 'static');
    // background.layer = 1;

    //create floor collider
    floor.color = floorColor; 
    rWall.color = wallColor;
    lWall.color = wallColor;
    ceiling.color = wallColor;
    
    //create pet sprite
    pet = new Sprite(.5*canvasWidth, .5*canvasHeight, petSize);
    pet.color = petColor;	pet.draw = () => {
		push();
		rotate(pet.direction);
		ellipse(0, 0, 100 + pet.speed, 100 - pet.speed);
		pop();
	}

    //create player sprite
    player = new Sprite (250, 250, 20, 'kinematic');
}

function eat(){
    food.remove();
    petColor = "#A0E283"
    foodExists = false;
}
function createBall(){
    if (ballExists == true || foodExists == true){
        return;
    }
    ball = new Sprite(mouse.x, mouse.y -playerSize/2, 30);
    ballExists = true;

}
function putBallAway(){
    ball.remove();
    ballExists = false;
}

function createFood(){
    if (foodExists == true){
        return;
    }
    food = new Sprite(mouse.x, mouse.y + playerSize/2, 10, 10);
    food.rotationSpeed = 1; 
    food.color = foodColor;
    foodExists = true;
}
function startChase(){
    followMouse = true;
}
function stopChase(){
    followMouse = false
}


function draw() {
    background(bgColor);
    pet.color = petColor;
    

    //has player sprite follow mouse movement
    player.moveTo(mouse, 60);

    //drop piece of food from mouse pos when space is pressed.
    if (kb.presses(' ') && !ballExists) {  
        createFood();
    }

    //move pet toward food
    if(foodExists && !pet.overlap(food, eat)){
        petColor = '#A378C9'
        pet.attractionPoint(.2, food.x, food.y);
    }

    //change pet color when mouse over
    if (player.overlapping(pet)){
        pet.color = '#ED78B7';
        
    }

    if (kb.pressed('b')){
        if(!ballExists){
            createBall();
        }else{
            putBallAway();
        }
    }
    if (ballExists){
        pet.attractionPoint(.2, ball.x, ball.y);
    }
    if (kb.pressed('c')){
        if (!followMouse){
            startChase();
        }else{
            stopChase();
        }
    }
    if (followMouse){
        pet.attractionPoint(.2, player.x, pet.y);
    }
    drawSprites();
    
    
}

