function Game() {
    this.grid_length = Math.floor(windowWidth * .85 / 40);
    this.grid_height = Math.floor(windowHeight * .95 / 40);
    this.currentTile = 1;
    this.tiles = [];
    this.mode = new Edit();
    this.won = false;
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
        this.start = this.tiles[Math.floor(this.grid_length / 4)][Math.floor(this.grid_height / 2)];
        this.hole = this.tiles[Math.floor(3 * this.grid_length / 4)][Math.floor(this.grid_height / 2)];
        this.tiles[Math.floor(this.grid_length / 4)][Math.floor(this.grid_height / 2)].type = 4;
        this.tiles[Math.floor(3 * this.grid_length / 4)][Math.floor(this.grid_height / 2)].type = 3;
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
        if (this.isValidGame()) {
            var starting_spot = {
                'x': this.start.x * 40 + 20,
                'y': this.start.y * 40 + 20,
            }
            this.ball = new Ball(starting_spot);
            this.mode = new Play();
        }
    }
    this.train = function (players, populations, variation) {
        if (this.isValidGame()) {
            let train = new Train({
                'players': players,
                'populations': populations,
                'variation': variation,
            });
            var starting_spot = {
                'x': game.start.x * 40 + 20,
                'y': game.start.y * 40 + 20,
            }
            train.setup_populations(starting_spot);
            this.mode = train;
        }
    }
    this.reset = function () {
        if (this.ball) {
            this.ball.reset(this.start);
        }
        else {
            this.mode = new Edit();
        }
    }
    this.edit = function () {
        this.best_path = [];
        this.mode = new Edit();
    }
    this.isValidGame = function () {
        if (!(this.start && this.hole)) {
            alert("You must choose a starting spot and hole");
            return false;
        }
        if (!(findShortestPath([this.start.x, this.start.y], this.tiles))) {
            alert("No valid path to hole");
            for (var i = 0; i < this.grid_length; i += 1) {
                for (var j = 0; j < this.grid_height; j += 1) {
                    this.tiles[i][j].visited = false;
                }
            }
            return false;
        }
        for (var i = 0; i < this.grid_length; i += 1) {
            for (var j = 0; j < this.grid_height; j += 1) {
                this.tiles[i][j].visited = false;
            }
        }
        return true;
    }
}
function generateRandomInteger(min, max) {
    return min + Math.random() * (max - min);
}