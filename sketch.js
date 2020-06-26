let tiles;

function setup() {
    createCanvas(windowWidth * .9, windowHeight * .9);
    tiles = [];
    for (var x = 0; x < 40; x += 1) {
        tiles[x] = [];
        for (var y = 0; y < 20; y += 1) {
            tiles[x][y] = new Tile(x, y);
        }
    }

}

function draw() {

    for (var x = 0; x < 40; x += 1) {
        for (var y = 0; y < 20; y += 1) {
            tiles[x][y].draw();
        }
    }
}

function mouseClicked() {
    var x = Math.floor((mouseX - 5) / 40);
    var y = Math.floor((mouseY - 10) / 40);
    tiles[x][y].wall = !tiles[x][y].wall;
}