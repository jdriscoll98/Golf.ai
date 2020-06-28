function Train(params) {
    this.name = "train";
    this.players = params.players;
    this.populations = params.populations;
    this.display = params.display;
    this.currentPopulation = 0;
    this.enter = function (start) {
        game.populations = [];
        game.best_path = [];
        for (var i = 0; i < this.populations; i++) {
            game.populations[i] = [];
            for (var p = 0; p < this.players; p++) {
                game.populations[i][p] = new Ball(start);
                game.populations[i][p].load_velocity = [generateRandomInteger(-.75, .75), generateRandomInteger(-.75, .75)];
                game.populations[i][p].velocity = [generateRandomInteger(-.75, .75), generateRandomInteger(-.75, .75)];
            }
        }
    }
    this.update = function () {
        for (var p = 0; p < this.players; p++) {
            game.populations[this.currentPopulation][p].update();
        }
    }
    this.draw = function () {
        for (var x = 0; x < game.grid_length; x += 1) {
            for (var y = 0; y < game.grid_height; y += 1) {
                game.tiles[x][y].draw();
            }
        }
        stroke(0);
        fill(255);
        for (var p = 0; p < this.players; p++) {
            game.populations[this.currentPopulation][p].draw();
        }
        noStroke();

    }
}