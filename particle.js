class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.path = [];
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.path.push(this.pos.copy());
    if (this.path.length > 100) {
      this.path.splice(0, 1);
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }
  direction(flowField) {
    let i = floor(this.pos.x / size);
    let j = floor(this.pos.y / size);
    i = constrain(i, 0, cols - 1);
    j = constrain(j, 0, rows - 1);
    let force = createVector(flowField[i][j].x, flowField[i][j].y);
    this.applyForce(force);
  }
  draw() {
    strokeWeight(2)
    stroke(this.r,this.g,this.b);
    // ellipse(this.pos.x, this.pos.y, 2, 2);
    for (let i = 0; i < this.path.length - 2; i++) {
      line(
        this.path[i].x,
        this.path[i].y,
        this.path[i + 1].x,
        this.path[i + 1].y
      );
    }
  }
}
