function Play(params) {
    this.name = "play";
    this.update = function () {
        game.ball.update();
        if (game.won) {
            alert("You win!");
            game.won = false;
            game.ball.reset(game.start);
        }
        this.handleInput();
    }
    this.handleInput = function () {
        if ((mouseIsPressed && mouseButton == LEFT && game.ball.isStopped()) || game.ball.loading) {
            if ((Math.abs((mouseX - game.ball.x) < 20 && Math.abs(mouseY - game.ball.y) < 20)) || game.ball.loading) {
                game.ball.loading = true;
            }
            else {
                game.ball.loading = false;
                return;
            }
            line(mouseX, mouseY, game.ball.x, game.ball.y);
            distanceX = (mouseX - game.ball.x) / 300;
            distanceY = (mouseY - game.ball.y) / 300;
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
    this.draw = function () {
        noStroke();
        for (var x = 0; x < game.grid_length; x += 1) {
            for (var y = 0; y < game.grid_height; y += 1) {
                game.tiles[x][y].draw();
            }
        }
        stroke(0);
        fill(255);
        game.ball.draw();
    }
}


function mouseReleased() {
    if (game.ball && game.ball.isStopped() && game.ball.loading) {
        game.ball.velocity[0] = game.ball.load_velocity[0];
        game.ball.velocity[1] = game.ball.load_velocity[1];
        game.ball.loading = false;
        game.ball.stroke_count += 1;
        game.ball.path_distance = 0;
    }
}

