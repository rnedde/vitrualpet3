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
    
    //create food sprite group
    food = new Group();
    food.color = foodColor;
    
}

function eat(){
    food.remove();
    foodExists = false;
}
function createFood(){
    food = new Sprite(mouse.x, mouse.y, 10);
    food.color = foodColor; 
    foodExists = true;
}

function draw() {
    background(bgColor);

    if (mouse.presses()) {
        createFood();
    }

    if (foodExists && !pet.overlap(food, eat)){
        pet.attractionPoint(.5, food.x, food.y);
        
    }

}

