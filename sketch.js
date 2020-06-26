let game;

function setup() {
    let canvas = createCanvas(windowWidth * .85, .95 * windowHeight);
    canvas.position(.15 * windowWidth, .025 * window);
    game = new Game();
    game.initialize();
}

function draw() {
    game.draw();
    if (game.active) {
        game.ball.update();
        if (mouseIsPressed && mouseButton == LEFT) {
            var x = Math.floor((mouseX - 5) / 40);
            var y = Math.floor((mouseY - 10) / 40);

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

