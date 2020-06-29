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
                var velocity_x = generateRandomInteger(-.75, .75);
                var velocity_y = generateRandomInteger(-.75, .75);
                game.populations[i][p].load_velocity = [velocity_x, velocity_y];
                game.populations[i][p].velocity = [velocity_x, velocity_y];
            }
        }
    }
    this.update = function () {
        if (game.won) {
            this.best_path.push(game.winning_ball_velocity.slice(0));
            game.ball = new Ball(game.start);
            game.ball.velocity[0] = this.best_path[0][0];
            game.ball.velocity[1] = this.best_path[0][1];
            game.won = false;
            game.mode = new Replay(this.best_path.slice(0));
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
                'path_x': best_ball.load_velocity[0],
                'path_y': best_ball.load_velocity[1]
            });
            this.currentPopulation += 1;
            // take best shot from all populations and move to next shot;
            if (this.currentPopulation >= this.populations) {
                var min_distance = 999999;
                var best_shot_x, best_shot_y;
                for (var i = 0; i < this.population_best_paths.length; i++) {
                    if (this.population_best_paths[i].distance < min_distance) {
                        best_shot_x = this.population_best_paths[i].path_x;
                        best_shot_y = this.population_best_paths[i].path_y;
                        min_distance = this.population_best_paths[i].distance;
                    }
                }
                this.best_path.push([best_shot_x, best_shot_y]);
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
            // hide all balls
            current_ball.display = false;
            // 
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

