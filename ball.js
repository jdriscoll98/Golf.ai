function Ball(tile) {
    this.x = tile.x * 40 + 20;
    this.y = tile.y * 40 + 20;
    this.velocity = [1, 1];
    this.friction = .0005;
    this.update = function () {
        this.x += this.velocity[0] * deltaTime;
        this.y += this.velocity[1] * deltaTime;
        this.checkForCollision();
        if (this.velocity[0] < 0) {
            this.velocity[0] += this.friction * deltaTime;
            this.velocity[0] = Math.min(0, this.velocity[0]);
        }
        else if (this.velocity[0] > 0) {
            this.velocity[0] -= this.friction * deltaTime;
            this.velocity[0] = Math.max(0, this.velocity[0]);

        }

        if (this.velocity[1] < 0) {
            this.velocity[1] += this.friction * deltaTime;
            this.velocity[1] = Math.min(0, this.velocity[1]);
        }
        else if (this.velocity[1] > 0) {
            this.velocity[1] -= this.friction * deltaTime;
            this.velocity[1] = Math.max(0, this.velocity[1]);

        }
    }
    this.checkForCollision = function () {
        currentY = Math.floor((this.y - 20) / 40);
        currentX = Math.floor((this.x - 20) / 40);

        currentX_Left = Math.floor((this.x - 20) / 40);
        currentX_Right = Math.floor((this.x + 10) / 40);
        currentY_Top = Math.floor((this.y - 20) / 40);
        currentY_Bottom = Math.floor((this.y + 20) / 40);


        // Bottom
        if (game.tiles[currentX][currentY_Top + 1].type == 1) {
            this.velocity[1] = -this.velocity[1];
            this.y -= 20;
            return;
        }
        // Top
        if (game.tiles[currentX][currentY_Bottom - 1].type == 1) {
            this.velocity[1] = -this.velocity[1];
            this.y += 20;
            return;
        }
        // right
        if (game.tiles[currentX_Left + 1][currentY].type == 1) {
            this.velocity[0] = -this.velocity[0];
            this.x -= 20;
            return;
        }
        // left
        if (game.tiles[currentX_Right - 1][currentY].type == 1) {
            this.velocity[0] = -this.velocity[0];
            this.x += 20;
            return;
        }
    }
    this.draw = function () {
        circle(this.x, this.y, 30);
    }
}