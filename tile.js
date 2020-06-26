function Tile(x, y) {
    this.x = x;
    this.y = y;
    this.wall = false;
    this.draw = function () {
        if (this.wall) {
            fill(0);
            stroke(255);
        }
        else {
            fill(255);
            stroke(0);
        }
        rect(x * 40, y * 40, 40, 40);
    }
}
