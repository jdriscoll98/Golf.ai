let game;

// Settings
let GRID_SIZE = 40;
let TILE_MAP = {
    0: "Grass",
    1: "Wall",
    2: "Water",
    3: "Hole",
    4: "Start",
    5: "Sand",
}

function setup() {
    let canvas = createCanvas(windowWidth * .85, windowHeight);
    canvas.position(.15 * windowWidth, .025 * window);
    game = new Game();
    game.initialize();
}

function draw() {
    game.mode.draw();
    game.mode.update();
}

