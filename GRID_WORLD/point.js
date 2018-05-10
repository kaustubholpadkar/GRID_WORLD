// Point Constructor

function Point(x, y, col) {
  this.x = x;
  this.y = y;
  this.dia = 10;
  this.col = col;

  this.plot = function() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
