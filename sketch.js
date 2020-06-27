let game;

function setup() {
    let canvas = createCanvas(windowWidth * .85, .95 * windowHeight);
    canvas.position(.15 * windowWidth, .025 * window);
    game = new Game();
    game.initialize();
}

function draw() {
    game.draw();
    // Playing
    if (game.mode === 1) {
        game.ball.update();
        if ((mouseIsPressed && mouseButton == LEFT && game.ball.velocity[0] == 0 && game.ball.velocity[1] == 0) || game.ball.loading) {
            if ((Math.abs((mouseX - game.ball.x) < 20 && Math.abs(mouseY - game.ball.y) < 20)) || game.ball.loading) {
                game.ball.loading = true;
            }
            else {
                game.ball.loading = false;
                return;
            }
            var x = Math.floor((mouseX - 5) / 40);
            var y = Math.floor((mouseY - 10) / 40);
            line(mouseX, mouseY, game.ball.x, game.ball.y);
            distanceX = (mouseX - game.ball.x) / 300;
            distanceY = (mouseY - game.ball.y) / 300;
            text(distanceX, mouseX, mouseY);
            text(distanceY, mouseX + 20, mouseY + 20);
            if (distanceX > 0) {
                game.ball.load_velocity[0] = Math.max(-distanceX, -1);
            }
            else {
                game.ball.load_velocity[0] = Math.min(-distanceX, 1);
            }
            if (distanceY > 0) {
                game.ball.load_velocity[1] = Math.max(-distanceY, -1);
            }
            else {
                game.ball.load_velocity[1] = Math.min(-distanceY, 1);

            }
        }
    }
    else if (game.mode == 2) {
        for (ball in game.population) {
            game.population[ball].update();
        }
        // if (game.won) {
        //     game.reset();
        // }
        let next_population = true;
        for (ball in game.population) {
            if (!(game.population[ball].isStopped())) {
                next_population = false;
                break;
            }
        }
        if (next_population) {
            let best_ball;
            let closest_distance = 999999999;
            for (ball in game.population) {
                game.population[ball].display = false;
                if (game.population[ball].path_distance < closest_distance) {
                    best_ball = game.population[ball];
                    closest_distance = best_ball.path_distance;
                }
            }
            best_ball.display = true;
            tileX = Math.floor((best_ball.x) / 40);
            tileY = Math.floor((best_ball.y) / 40);
            game.best_path.push(best_ball.load_velocity)
            console.log(game.best_path);
            // let pop_size = game.population.length;
            // for (var p = 0; p < pop_size; p++) {
            //     game.population[p] = new Ball({ x: tileX, y: tileY });
            //     game.population[p].load_velocity = [generateRandomInteger(-1, 1), generateRandomInteger(-1, 1)];
            //     game.population[p].velocity = [generateRandomInteger(-1, 1), generateRandomInteger(-1, 1)];
            // }
        }

    }
    else {
        if (mouseIsPressed && mouseButton == LEFT) {
            var x = Math.floor((mouseX - 5) / 40);
            var y = Math.floor((mouseY - 10) / 40);
            if (x >= 0 && y >= 0 && x < game.grid_length && y < game.grid_height) {
                game.changeTile(x, y);
            }
        }
    }
}

function mouseReleased() {
    if (game.mode === 1 && game.ball.velocity[0] == 0 && game.ball.velocity[1] == 0 && game.ball.loading) {
        game.ball.velocity[0] = game.ball.load_velocity[0];
        game.ball.velocity[1] = game.ball.load_velocity[1];
        game.ball.loading = false;
        game.ball.stroke_count += 1;
        game.ball.path_distance = 0;
    }
}

