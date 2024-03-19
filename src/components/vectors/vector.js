export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setAngle(angle) {
    const length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length) {
    const angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  multiply(val) {
    return new Vector(this.x * val, this.y * val);
  }

  divide(val) {
    return new Vector(this.x / val, this.y / val);
  }

  addTo(v2) {
    this.x += v2.x;
    this.y += v2.y;
  }

  subtractFrom(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
  }

  multiplyBy(val) {
    this.x *= val;
    this.y *= val;
  }

  divideBy(val) {
    this.x /= val;
    this.y /= val;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  get() {
    return { x: this.x, y: this.y };
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
