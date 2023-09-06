let systems;
let startTime;
let shapevisible= true;
var tranx=150;
var trany=150;
let c=0; //counter for mouse clicked
var canvas;

function setup() {
    
    var canvas = createCanvas(400, 500);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('holder1');
   
    background(51);
    background(255);
 // background(230, 212, 179);
  translate( tranx,trany) 
    stroke(132, 153, 96)
   strokeWeight(10)
   line(0,0,0,1000)
 
   noStroke()
  
   fill(255, 200, 0,70)
   ellipse(0,0,105,105)
   ellipse(0,0,110,110)
   ellipse(0,0,93,93)
   ellipse(0,0,120,120)
  fill(255, 255, 0)
   ellipse(0,0,100,100)
  
  systems = [];
  
}

function draw() 
{  
  if(shapevisible=== true)
    {   
     for (i = 0; i < systems.length; i++)
     { 
      systems[i].run();
     systems[i].addParticle();
     }
     // Check if 5 seconds have passed, and stop the system
     if (millis() - startTime >= 3000)
       {
       shapevisible= !shapevisible;
         clear();
         background (209,196,233);
        fill(0);
        noStroke();
         textFont('Georgia')
        textSize(15);
         text("On the wings of fairies,", 100, 100)
         text("Your wish flies, ", 100, 120)
         text("To lands long lost ", 100, 140)
         text("And comes back with ", 100, 160)
         text("A tidal wave of dreams", 100, 180);
    
       }
    }
  else
    {     
      noLoop();
    }

}

function mousePressed() {
  let d = dist(mouseX, mouseY, tranx, trany)
      if (d < 50)
      {
        c++;
        if (c===1)
          {translate( tranx,trany)
         fill(225,90);
        stroke(225)
         strokeWeight(2);
       for (let i = 0; i < 40 ; i ++) {
        line(0, 0, 20, 80);
        ellipse(20,80,10,10);
      rotate(PI/20);
       }
       fill(0);
        noStroke();
        textSize(11);
        text("Make a wish and click again :)", 10, -100)
        }
      else if(c===2)
    { background(51);
    background(255);
   translate( tranx,trany) 
    stroke(132, 153, 96)
   strokeWeight(10)
   line(0,0,0,1000)
     
      startTime = millis(); // Record the starting time
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
  systems.push(p);
    }
      }
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0.03, 0);
  this.velocity = createVector(random(0, 1), random(1, -1));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(137, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  // Add either a Particle or CrazyParticle to the system
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
  }
  else {
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

// A subclass of Particle

function CrazyParticle(origin) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Particle.call(this, origin);

  // Initialize our added properties
  this.theta = 0.0;
};

// Create a Crazy.prototype object that inherits from Particle.prototype.
// Note: A common error here is to use "new Particle()" to create the
// Crazy.prototype. That's incorrect for several reasons, not least
// that we don't have anything to give Particle for the "origin"
// argument. The correct place to call Particle is above, where we call
// it from Crazy.
CrazyParticle.prototype = Object.create(Particle.prototype); // See note below

// Set the "constructor" property to refer to CrazyParticle
CrazyParticle.prototype.constructor = CrazyParticle;

// Notice we don't have the method run() here; it is inherited from Particle

// This update() method overrides the parent class update() method
CrazyParticle.prototype.update=function() {
  Particle.prototype.update.call(this);
  // Increment rotation based on horizontal velocity
  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
}

// This display() method overrides the parent class display() method
CrazyParticle.prototype.display=function() {
  // Render the ellipse just like in a regular particle
  Particle.prototype.display.call(this);
  // Then add a rotating line
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(255, this.lifespan);
  line(0, 0, 25, 0);
  pop();
}
