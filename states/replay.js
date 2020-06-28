function Replay(path) {
    this.path = path;
    this.current_shot = 0;
    this.update = function () {
        game.ball.update();

        if (game.ball.isStopped()) {
            this.current_shot++;
            if (this.current_shot >= this.path.length) {
                this.current_shot = 0;
                game.ball.reset(game.start);
            }
            // console.log(this.current_shot, this.path[this.current_shot]);
            game.ball.velocity = this.path[this.current_shot];
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