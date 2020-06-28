function Train(params) {
    this.name = "train";
    this.players = params.players;
    this.populations = params.populations;
    this.currentPopulation = 0;
    this.best_path = [];
    this.population_best_paths = [];
    this.setup_populations = function (start) {
        this.currentPopulation = 0;
        this.last_start = start;
        game.populations = [];
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
        if (game.won) {
            this.best_path.push(game.winning_ball_velocity);
            console.log("BEST", this.best_path);
            game.ball = new Ball(game.start);
            game.ball.velocity = this.best_path[0];
            game.won = false;
            game.mode = new Replay(this.best_path);
        }
        var all_stopped = true;
        for (var p = 0; p < this.players; p++) {
            game.populations[this.currentPopulation][p].update();
            if (!(game.populations[this.currentPopulation][p].isStopped()) || game.populations[this.currentPopulation][p].path_distance === 0) {
                all_stopped = false;
            };
        }
        if (all_stopped) {
            var best_ball = this.set_best_ball();
            // store best shot from this population
            this.population_best_paths.push({
                'distance': best_ball.path_distance,
                'path': best_ball.load_velocity
            });
            this.currentPopulation += 1;
            // take best shot from all populations and move to next shot;
            if (this.currentPopulation >= this.populations) {
                var min_distance = 999999;
                var best_shot;
                for (var path = 0; path < this.population_best_paths.length; path++) {
                    if (this.population_best_paths[path].distance < min_distance) {
                        best_shot = this.population_best_paths[path].path
                        min_distance = this.population_best_paths[path].distance;
                    }
                }
                this.best_path.push(best_shot);
                var new_start_x = Math.floor(best_ball.x / 40);
                var new_start_y = Math.floor(best_ball.y / 40);
                this.setup_populations({
                    'x': new_start_x,
                    'y': new_start_y
                });
            }

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
        return best_ball;
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

