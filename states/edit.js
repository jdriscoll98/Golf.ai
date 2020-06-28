function Edit() {
    this.name = "edit";
    this.update = function () {
        if (mouseIsPressed && mouseButton == LEFT) {
            var x = Math.floor((mouseX - 5) / 40);
            var y = Math.floor((mouseY - 10) / 40);
            if (x >= 0 && y >= 0 && x < game.grid_length && y < game.grid_height) {
                game.changeTile(x, y);
            }
        }
    }
    this.draw = function () {
        stroke(0);
        for (var x = 0; x < game.grid_length; x += 1) {
            for (var y = 0; y < game.grid_height; y += 1) {
                game.tiles[x][y].draw();
            }
        }
    }
}