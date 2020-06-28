function Train(params) {
    this.name = "train";
    this.players = params.players;
    this.populations = params.populations;
    this.display = params.display;
    this.currentPopulation = 0;
    this.enter = function (start) {
        this.currentPopulation = 0;
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
            var all_stopped = game.populations[this.currentPopulation][p].isStopped();
        }
        if (all_stopped) {
            this.set_best_ball();
        }
    }
    this.set_best_ball = function () {
        let best_ball;
        let closest_distance = 999999;
        for (var p = 0; p < this.players; p++) {
            let ball = game.populations[this.currentPopulation][p];
            ball.display = false;
            if (ball.path_distance < closest_distance) {
                best_ball = ball;
                closest_distance = best_ball.path_distance;
            }
        }
        best_ball.display = true;
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