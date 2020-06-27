function Game() {
    this.grid_length = Math.floor(windowWidth * .85 / 40);
    this.grid_height = Math.floor(windowHeight * .95 / 40);
    this.currentTile = 1;
    this.tiles = [];
    this.mode = 0;
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
        this.start = this.tiles[1][1];
        this.hole = this.tiles[this.grid_length - 2][this.grid_height - 2];
        this.tiles[1][1].type = 4;
        this.tiles[this.grid_length - 2][this.grid_height - 2].type = 3;
    }
    this.draw = function () {
        if (game.mode === 1) {
            noStroke();
        }
        else {
            stroke(0);
        }
        for (var x = 0; x < this.grid_length; x += 1) {
            for (var y = 0; y < this.grid_height; y += 1) {
                this.tiles[x][y].draw();
            }
        }
        if (game.mode === 1) {
            stroke(0);
            fill(255);
            game.ball.draw();
        }
        if (game.mode === 2) {
            stroke(0);
            fill(255);
            for (ball in game.population) {
                game.population[ball].draw();
            }
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
        if (this.isValidGame()) {
            game.ball = new Ball(game.start);
            this.mode = 1;
        }
    }
    this.train = function (players, generations, display) {
        if (this.isValidGame()) {
            game.population = [];
            game.best_path = [];
            for (var p = 0; p < players; p++) {
                game.population[p] = new Ball(game.start);
                game.population[p].load_velocity = [generateRandomInteger(-1, 1), generateRandomInteger(-1, 1)];
                game.population[p].velocity = [generateRandomInteger(-1, 1), generateRandomInteger(-1, 1)];
                this.mode = 2;
            }
        }
    }
    this.reset = function () {
        if (game.ball) {
            game.ball.reset(game.start);
        }
        else {
            game.mode = 0;
        }
        return;
    }
    this.edit = function () {
        this.mode = 0;
    }
    this.isValidGame = function () {
        if (!(game.start && game.hole)) {
            alert("You must choose a starting spot and hole");
            return false;
        }
        if (!(findShortestPath([game.start.x, game.start.y], game.tiles))) {
            alert("No valid path to hole");
            for (var i = 0; i < game.grid_length; i += 1) {
                for (var j = 0; j < game.grid_height; j += 1) {
                    game.tiles[i][j].visited = false;
                }
            }
            return false;
        }
        for (var i = 0; i < game.grid_length; i += 1) {
            for (var j = 0; j < game.grid_height; j += 1) {
                game.tiles[i][j].visited = false;
            }
        }
        return true;
    }
}
function generateRandomInteger(min, max) {
    return min + Math.random() * (max + 1 - min);
}