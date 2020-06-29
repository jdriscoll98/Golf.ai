function Train(params) {
    this.name = "train";
    this.players = params.players;
    this.populations = params.populations;
    this.variation = params.variation / 100;
    this.currentPopulation = 0;
    this.currentShot = 1;
    this.best_path = [];
    this.population_best_paths = [];
    this.setup_populations = function (start) {
        this.currentPopulation = 0;
        game.populations = [];
        for (var i = 0; i < this.populations; i++) {
            game.populations[i] = [];
            for (var p = 0; p < this.players; p++) {
                game.populations[i][p] = new Ball(start);

            }
        }
        for (var p = 0; p < this.players; p++) {
            var velocity_x = generateRandomInteger(-.75, .75);
            var velocity_y = generateRandomInteger(-.75, .75);
            game.populations[0][p].load_velocity = [velocity_x, velocity_y];
            game.populations[0][p].velocity = [velocity_x, velocity_y];
        }
    }
    this.update = function () {
        if (game.won) {
            this.best_path.push(game.winning_ball_velocity.slice(0));
            var starting_spot = {
                'x': game.start.x * 40 + 20,
                'y': game.start.y * 40 + 20,
            }
            console.log("STARTING", starting_spot.x, starting_spot.y);
            game.ball = new Ball(starting_spot);
            game.ball.velocity[0] = this.best_path[0][0];
            game.ball.velocity[1] = this.best_path[0][1];
            game.mode = new Replay(this.best_path.slice(0));
            game.won = false;
            return;
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
                this.currentShot++;
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
                this.setup_populations({
                    'x': best_ball.x,
                    'y': best_ball.y
                });
            }
            else {
                var min_distance = 999999;
                var best_shot_x, best_shot_y;
                for (var i = 0; i < this.population_best_paths.length; i++) {
                    if (this.population_best_paths[i].distance < min_distance) {
                        best_shot_x = this.population_best_paths[i].path_x;
                        best_shot_y = this.population_best_paths[i].path_y;
                        min_distance = this.population_best_paths[i].distance;
                    }
                }
                for (var p = 0; p < this.players; p++) {
                    var velocity_x = generateRandomInteger(best_shot_x * (1 - this.variation), best_shot_x * (1 + this.variation));
                    var velocity_y = generateRandomInteger(best_shot_y * (1 - this.variation), best_shot_y * (1 + this.variation));
                    game.populations[this.currentPopulation][p].load_velocity[0] = velocity_x;
                    game.populations[this.currentPopulation][p].load_velocity[1] = velocity_y;
                    game.populations[this.currentPopulation][p].velocity[0] = velocity_x;
                    game.populations[this.currentPopulation][p].velocity[1] = velocity_y;
                }
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
        text("Shot Number: " + this.currentShot, 80, 70);
        var displayPop = this.currentPopulation + 1
        text("Population: " + displayPop, 80, 80);
    }
}

