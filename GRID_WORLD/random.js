var grid_env;
var fps = 5;
var delay;

function setup() {
  delay = new p5.Delay();
  // tile = new Tile(100, 100, tile_width, tile_height, 1, 0, 0);
  grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
  grid_env.initialize();
  grid_env.value_iteration();
  // frameRate(fps)

  setInterval(doIt, 500);

  createCanvas(900, 650);
  background(51);
}

function doIt () {

  var current_state = grid_env.grid.getCurrentState();
  if (grid_env.grid.isGoalState(current_state) || grid_env.grid.isDoomState(current_state)) {
    grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
    grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
    redraw();
  }

  var action = Math.trunc(random(4));
  // var action = grid_env.policy(current_state);
  grid_env.act(action);
}

function draw() {
  grid_env.grid.show();
}
