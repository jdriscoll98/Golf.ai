function Train(params) {
    this.name = "train";
    this.players = params.players;
    this.populations = params.populations;
    this.display = params.display;
    this.currentPopulation = 0;
    this.foundBestBall = false;
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
        var all_stopped = true;
        for (var p = 0; p < this.players; p++) {
            game.populations[this.currentPopulation][p].update();
            if (!(game.populations[this.currentPopulation][p].isStopped()) || !(game.populations[this.currentPopulation][p].path_distance !== 0)) {
                all_stopped = false;
            };
        }
        if (all_stopped && !this.foundBestBall) {
            this.set_best_ball();
        }
    }
    this.set_best_ball = function () {
        var best_ball;
        var current_ball;
        var closest_distance = 999999;
        for (var p = 0; p < this.players; p++) {
            current_ball = game.populations[this.currentPopulation][p];
            current_ball.display = false;
            if (current_ball.path_distance < closest_distance) {
                closest_distance = current_ball.path_distance;
                best_ball = current_ball;
            }
        }
        best_ball.display = true;
        this.foundBestBall = true;
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