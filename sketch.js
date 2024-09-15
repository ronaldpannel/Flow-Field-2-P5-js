let cols;
let rows;
let size = 50;
let arrows = [];
let xOff = 0;
let yOff = 0;
let zOff = 0;
let increment = 0.1;
let r = size / 2;
let particles = [];
let num = 2;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  cols = width / size;
  rows = height / size;
  stroke(0);
}

function draw() {
  background(30);
  fill(255);
  for (let i = 0; i < num; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  xOff = 0;
  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    yOff = 0;
    for (let j = 0; j < rows; j++) {
      let angle = map(noise(xOff, yOff, zOff), 0, 1, 0, 360);
      // rect(i * size, j * size, size, size);
      // text(round(angle, 3), size / 2 + i * size, size / 2 + j * size);
      arrows[i][j] = createVector(cos(angle), sin(angle));
      let pt0 = createVector(i * size, j * size);
      let pt1 = createVector(r * arrows[i][j].x, r * arrows[i][j].y);
      // line(pt0.x, pt0.y, pt0.x + pt1.x, pt0.y + pt1.y);
      // ellipse(pt0.x + pt1.x, pt0.y + pt1.y, 5, 5);

      yOff += increment;
    }
    xOff += increment;
    zOff += 0.0001;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].direction(arrows);
    particles[i].update();
    particles[i].draw();

    //
  }
  for (let i = particles.length - 1; i > 0; i--) {
    if (
      particles[i].pos.x > width + 200||
      particles[i].pos.x < 0 -200 ||
      particles[i].pos.y > height + 200 ||
      particles[i].pos.y < 0 - 200
    ) {
      particles.splice(i, 1);
    }
  }
  console.log(particles.length);
}

// function windowResized() {
//   resizeCanvas(400, 400);
// }
