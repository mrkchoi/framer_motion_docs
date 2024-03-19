import Vector from "../vectors/vector";

export default class Particle {
  constructor(x, y, speed, direction) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }

  update() {
    this.position.addTo(this.velocity);
  }

  draw(context, color = "black", radius = 10) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(
      this.position.x,
      this.position.y,
      radius,
      0,
      Math.PI * 2,
      false,
    );
    context.fill();
  }
}
