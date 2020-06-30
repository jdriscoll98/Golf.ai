function Replay(path) {
    this.path = path;
    this.current_shot = 0;
    this.update = function () {
        if (game.won) {
            this.current_shot = 0;
            game.ball.reset(game.start);
            game.ball.velocity[0] = this.path[this.current_shot][0];
            game.ball.velocity[1] = this.path[this.current_shot][1];
            game.won = false;
            return;
        }

        if (game.ball.isStopped()) {

            this.current_shot++;
            if (this.current_shot >= this.path.length) {
                this.current_shot = 0;
                game.ball.reset(game.start);
                game.ball.velocity[0] = this.path[this.current_shot][0];
                game.ball.velocity[1] = this.path[this.current_shot][1];
            }
            else {
                game.ball.x = this.path[this.current_shot - 1][2];
                game.ball.y = this.path[this.current_shot - 1][3];
            }
            game.ball.velocity[0] = this.path[this.current_shot][0];
            game.ball.velocity[1] = this.path[this.current_shot][1];
        }
        game.ball.update();
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