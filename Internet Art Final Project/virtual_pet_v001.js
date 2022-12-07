function preload() {
    
}

var canvasHeight = 500;
var canvasWidth = 500;
var bgColor = '#CCDABF'
var buttonColor = "#FF9622"
var button1x = 100;
var button1y = 100;
var floorHeight = 100;
var floorWidth = canvasWidth;
var wallWidth = 10;
var foodColor = "#CDA273";
var foodDiameter = 10;
var floorColor = "#0B980D";
var petColor = "#A378C9";
var wallColor = "#993722"
let floor,food, pet, lWall, rWall;
var foodExists = false;
button1 = new Clickable();


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    world.gravity.y = 9;
    
    floor = new Sprite(canvasWidth/2, canvasHeight - .5*floorHeight, floorWidth, floorHeight,);
    lWall = new Sprite(0, canvasHeight/2, wallWidth, canvasHeight, 'static');
    rWall = new Sprite(canvasWidth, canvasHeight/2, wallWidth, canvasHeight,'static');

    //create floor collider
    floor.color = floorColor; 
    rWall.color = wallColor;
    lWall.color = wallColor;
    floor.collider = 'static';
    
    

    //create pet sprite
    pet = new Sprite(.5*canvasWidth, .5*canvasHeight, 30);
    pet.color = petColor;

    food = new Group();
    food.color = foodColor;
    
    
}

function eat(){
    food.remove();
    foodExists
}
function createFood(){
    new food.Sprite(mouse.x,mouse.y, 10);
    foodExists = true;
}

function draw() {
    background(bgColor);

    if (mouse.presses()) {
        createFood();
    }

    if (!pet.overlap(food, eat)){
       pet.x = 300;
       pet.y = 300; 
    }

    if (kb.presses(' ')){
        // pet.delay(5000);
        // pet.velocity.x = (food.x - pet.velocity.x);
        // pet.velocity.y = (food.y - pet.velocity.y);
        if (!pet.overlap())
        pet.attractionPoint(3, food.x, food.y);
        pet.friction = 0.3;
        if (pet.collides(food)){
            eat();
        }
    }

}

