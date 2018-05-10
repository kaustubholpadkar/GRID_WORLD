var grid_env;

function setup() {
  // tile = new Tile(100, 100, tile_width, tile_height, 1, 0, 0);
  grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
  grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);

  createCanvas(900, 650);
  background(51);
}

function draw() {
  grid_env.grid.show();
}

function keyPressed() {
  var action = -1;
  if (keyCode === UP_ARROW) {
    action = 0;
  } else if (keyCode === DOWN_ARROW) {
    action = 1;
  } else if (keyCode === LEFT_ARROW) {
    action = 2;
  } else if (keyCode === RIGHT_ARROW) {
    action = 3;
  } else if (keyCode === ESCAPE) {
    grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
    grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
    return;
  }
  grid_env.act(action);

}


/*
function initializeButtons () {
  createElement("BR");
  createElement("BR");

  up = createButton("UP");
  up.mousePressed(upf);

  createElement("BR");
  createElement("BR");

  down = createButton("DOWN");
  down.mousePressed(downf);

  createElement("BR");
  createElement("BR");

  left = createButton("LEFT");
  left.mousePressed(leftf);

  createElement("BR");
  createElement("BR");

  right = createButton("RIGHT");
  right.mousePressed(rightf);
}

function upf () {
  grid_env.grid.set(grid_env.getNextState(grid_env.grid.getCurrentState(), 0));
}

function downf () {
  grid_env.grid.set(grid_env.getNextState(grid_env.grid.getCurrentState(), 1));
}

function leftf () {
  grid_env.grid.set(grid_env.getNextState(grid_env.grid.getCurrentState(), 2));
}

function rightf () {
  grid_env.grid.set(grid_env.getNextState(grid_env.grid.getCurrentState(), 3));
}
*/
