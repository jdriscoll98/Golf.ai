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
        this.start = this.tiles[1][1];
        this.hole = this.tiles[this.grid_length - 2][this.grid_height - 2];
        this.tiles[1][1].type = 4;
        this.tiles[this.grid_length - 2][this.grid_height - 2].type = 3;
    }
    this.draw = function () {
        // if (game.active) {
        //     noStroke();
        // }
        // else {
        //     stroke(0);
        // }
        for (var x = 0; x < this.grid_length; x += 1) {
            for (var y = 0; y < this.grid_height; y += 1) {
                this.tiles[x][y].draw();
            }
        }
        if (game.active) {
            fill(255);
            game.ball.draw();
        }
    }
    this.setTile = function (tile) {
        this.currentTile = tile;
    }
    this.changeTile = function (x, y) {
        if (this.currentTile == 3 || this.currentTile == 4) {
            for (var i = 0; i < this.grid_length; i += 1) {
                for (var j = 0; j < this.grid_height; j += 1) {
                    if (this.tiles[i][j].type == this.currentTile) {
                        this.tiles[i][j].type = 0;
                    }
                }
            }
        }
        if (this.currentTile == 3) {
            this.hole = this.tiles[x][y];
        }
        else if (this.currentTile == 4) {
            this.start = this.tiles[x][y];
        }
        if (!(x == 0 || y == 0 || x == this.grid_length - 1 || y == this.grid_height - 1)) {
            this.tiles[x][y].type = this.currentTile;
        }
    }
    this.activate = function () {
        if (game.start && game.hole) {
            game.ball = new Ball(game.start);
            this.active = true;
        }
        else {
            alert("You must choose a starting spot and a hole")
        }
    }
    this.reset = function () {
        return;
    }
    this.edit = function () {
        this.active = false;
    }
}