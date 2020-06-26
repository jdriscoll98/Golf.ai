function Game() {
    this.grid_length = Math.floor(windowWidth * .85 / 40);
    this.grid_height = Math.floor(windowHeight * .95 / 40);
    this.currentTile = 1;
    this.tiles = [];
    this.active = false;
    this.initialize = function () {
        for (var x = 0; x < this.grid_length; x += 1) {
            this.tiles[x] = [];
            for (var y = 0; y < this.grid_height; y += 1) {
                if (x == 0 || y == 0 || x == this.grid_length - 1 || y == this.grid_height - 1) {
                    this.tiles[x][y] = new Tile(x, y, type = 1);
                }
                else {
                    this.tiles[x][y] = new Tile(x, y);
                }
            }
        }
    }
    this.draw = function () {
        for (var x = 0; x < this.grid_length; x += 1) {
            for (var y = 0; y < this.grid_height; y += 1) {
                this.tiles[x][y].draw();
            }
        }
    }
    this.setTile = function (tile) {
        this.currentTile = tile;
    }
    this.changeTile = function (x, y) {

        if (!(x == 0 || y == 0 || x == this.grid_length - 1 || y == this.grid_height - 1)) {
            this.tiles[x][y].type = this.currentTile;
        }
    }
}