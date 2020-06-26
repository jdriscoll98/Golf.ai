function Tile(x, y, type = 0) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.draw = function () {
        stroke(0);
        if (this.type == 1) {
            fill(0);
        }
        else if (this.type == 2) {
            fill('blue');
        }
        else {
            fill('green');
        }
        rect(x * 40, y * 40, 40, 40);
    }
}
