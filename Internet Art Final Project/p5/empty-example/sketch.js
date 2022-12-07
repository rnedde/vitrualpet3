function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

  

function draw() {


  var n = 500; 

  noStroke();
  background(256, 200, 230);
  
  for (var i = 0; i <= n; i++){
    //set random variables
    var r = int(random(100,256));
    var g = int(random(100, 250));
    var b = int(random(200, 256));
    
    var size = int(random(0,100));
    
    var locX = int(random(0,windowWidth));
    var locY = int(random(0,windowHeight));
    
    var rand = int(random(0,2)); //random value to determine if circle or square
    
    var distX = abs(locX - mouseX); //finds distance from mouse
    var distY = abs(locY - mouseY);
    
    
    //creates cluster where mouse is clicked
    if((distX <= 200) && (distY <= 200) ){
                fill(r,g,b,80);
      if (rand == 0){
          ellipse(locX, locY, size);
      }else{
          rect(locX, locY, size, size);
      }      
    } 
    
  }  
  print("cool!");
}
function mouseClicked(){
  redraw();
}