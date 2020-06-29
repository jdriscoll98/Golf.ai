function Ball(start) {
    this.x = start.x
    this.y = start.y
    this.load_velocity = [0, 0];
    this.velocity = [0, 0];
    this.friction = .0009;
    this.loading = false;
    this.stroke_count = 0;
    this.path_distance = 0;
    this.display = true;
    this.update = function () {
        this.x += this.velocity[0] * deltaTime;
        this.y += this.velocity[1] * deltaTime;
        this.checkForCollision();
        if (this.velocity[0] == 0 && this.velocity[1] == 0) {
            if (this.path_distance == 0) {
                this.calculatePathDistance();
            }
        }
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
        // ball out of bounds, handle error better at some point
        if (!(currentX > 0 && currentY > 0 && currentX < game.grid_length && currentY < game.grid_height)) {
            this.path_distance = 999999;
            this.velocity = [0, 0];
            this.display = false;
            return;
        }
        // check if you made it in the hole
        if (game.tiles[currentX][currentY] == game.hole) {
            game.winning_ball_velocity = this.load_velocity;
            game.won = true;
        }

        if (game.tiles[currentX][currentY].type == 2) {
            this.reset(game.start);
        }


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
    this.calculatePathDistance = function () {
        X = Math.floor((this.x) / 40);
        Y = Math.floor((this.y) / 40);
        let path = findShortestPath([X, Y], game.tiles);
        this.path_distance = path.length;

        // clear visited tiles array;
        for (var i = 0; i < game.grid_length; i += 1) {
            for (var j = 0; j < game.grid_height; j += 1) {
                game.tiles[i][j].visited = false;
            }
        }
    }
    this.draw = function () {
        if (this.display) {
            circle(this.x, this.y, 30);
        }

    }
    this.reset = function (tile) {
        this.x = tile.x * 40 + 20;
        this.y = tile.y * 40 + 20;
        this.load_velocity = [0, 0];
        this.velocity = [0, 0];
        this.loading = false;
        this.stroke_count = 0;
        this.path_distance = 0;
    }
    this.isStopped = function () {
        return (this.velocity[0] == 0 && this.velocity[1] == 0);
    }
}

var findShortestPath = function (startCoordinates, grid) {
    var distanceFromLeft = startCoordinates[0];
    var distanceFromTop = startCoordinates[1];

    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
        distanceFromLeft: distanceFromLeft,
        distanceFromTop: distanceFromTop,
        path: [],
        status: 'Start'
    };

    // Initialize the queue with the start location already inside
    var queue = [location];

    // Loop through the grid searching for the goal
    while (queue.length > 0) {
        // Take the first location off the queue
        var currentLocation = queue.shift();

        var directions = ["North", "East", "South", "West"];
        for (dir in directions) {
            var newLocation = exploreInDirection(currentLocation, directions[dir], grid);
            if (newLocation.status === 'Goal') {
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }
        }
    }
    // No valid path found
    return false;

};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function (location, grid) {
    var dfl = location.distanceFromLeft;
    var dft = location.distanceFromTop;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= grid.grid_length ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= grid.grid_height) {

        // location is not on the grid--return false
        return 'Invalid';
    } else if (grid[dfl][dft].type == 3) {
        return 'Goal';
    } else if (grid[dfl][dft].type !== 0 || grid[dfl][dft].visited) {
        // location is either an obstacle or has been visited
        return 'Blocked';
    } else {
        return 'Valid';
    }
};


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function (currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);

    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;

    if (direction === 'North') {
        dft -= 1;
    } else if (direction === 'East') {
        dfl += 1;
    } else if (direction === 'South') {
        dft += 1;
    } else if (direction === 'West') {
        dfl -= 1;
    }

    var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);

    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromLeft][newLocation.distanceFromTop].visited = true;
    }

    return newLocation;
};



