let game;

function setup() {
    let canvas = createCanvas(windowWidth * .85, .95 * windowHeight);
    canvas.position(.15 * windowWidth, .025 * window);
    game = new Game();
    game.initialize();
}

function draw() {
    game.draw();
    if (game.mode === 1) {
        game.ball.update();
        if ((mouseIsPressed && mouseButton == LEFT) || game.ball.loading) {
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

