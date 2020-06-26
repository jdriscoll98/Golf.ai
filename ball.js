function Ball(tile) {
    this.x = tile.x * 40 + 20;
    this.y = tile.y * 40 + 20;
    this.load_velocity = [0, 0];
    this.velocity = [0, 0];
    this.friction = .001;
    this.update = function () {
        this.x += this.velocity[0] * deltaTime;
        this.y += this.velocity[1] * deltaTime;
        this.checkForCollision();
        if (this.velocity[0] < 0) {
            this.velocity[0] += -this.velocity[0] * this.friction * deltaTime;
            if (this.velocity[0] > -0.01) {
                this.velocity[0] = 0;
            }
        }
        else if (this.velocity[0] > 0) {
            this.velocity[0] -= this.velocity[0] * this.friction * deltaTime;
            if (this.velocity[0] < 0.01) {
                this.velocity[0] = 0;
            }
        }

        if (this.velocity[1] < 0) {
            this.velocity[1] += -this.velocity[1] * this.friction * deltaTime;
            if (this.velocity[1] > -0.01) {
                this.velocity[1] = 0;
            }
        }
        else if (this.velocity[1] > 0) {
            this.velocity[1] -= this.velocity[1] * this.friction * deltaTime;
            if (this.velocity[1] < 0.01) {
                this.velocity[1] = 0;
            }

        }
    }
    this.checkForCollision = function () {
        currentY = Math.floor((this.y) / 40);
        currentX = Math.floor((this.x) / 40);

        currentX_Left = Math.floor((this.x - 20) / 40);
        currentX_Right = Math.floor((this.x + 20) / 40);
        currentY_Top = Math.floor((this.y - 20) / 40);
        currentY_Bottom = Math.floor((this.y + 20) / 40);


        // Bottom
        if (game.tiles[currentX][currentY_Bottom].type == 1) {
            this.velocity[1] = -this.velocity[1];
            this.y -= 5;

            return;
        }
        // Top
        if (game.tiles[currentX][currentY_Top].type == 1) {
            this.velocity[1] = -this.velocity[1];
            this.y += 5;
            // this.velocity = [0, 0];

            return;
        }
        // right
        if (game.tiles[currentX_Right][currentY].type == 1) {
            this.velocity[0] = -this.velocity[0];
            this.x -= 5;
            // this.velocity = [0, 0];

            return;
        }
        // left
        if (game.tiles[currentX_Left][currentY].type == 1) {
            this.velocity[0] = -this.velocity[0];
            this.x += 5;
            // this.velocity = [0, 0];

            return;
        }
    }
    this.draw = function () {
        circle(this.x, this.y, 30);
        text(this.load_velocity[0], this.x + 20, this.y)
        text(this.load_velocity[1], this.x + 20, this.y + 20)
    }
}