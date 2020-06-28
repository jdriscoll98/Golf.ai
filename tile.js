function Tile(x, y, type = 0) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.draw = function () {
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
        if (this.type == 3) {
            fill(0);
            circle(x * 40 + 20, y * 40 + 20, 30)
        }
        if (this.type == 4) {
            if (game.mode.name !== 'edit') {
                return;
            }
            else {
                fill(255);
                circle(x * 40 + 20, y * 40 + 20, 30)
            }
        }
    }
}
