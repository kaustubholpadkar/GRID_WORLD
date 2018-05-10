var grid_env;
// var fps = 5;
// var delay;

function setup() {
  // delay = new p5.Delay();
  grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
  grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
  // frameRate(fps)
  // grid_env.value_iteration();
  setInterval(q_learning, 10);
  setInterval(doIt, 500);
  createCanvas(900, 650);

  background(51);
}

function q_learning (gamma = 0.9) {
  var max;
  var utility;
  var nextState;
  var temp;

  for (var i = 0; i < grid_env.states; i++) {
    nextState = grid_env.getNextState(i, 0);
    max = grid_env.getUtility(nextState);
    for (var j = 1; j < grid_env.actions; j++) {
      nextState = grid_env.getNextState(i, j);
      temp = grid_env.getUtility(nextState);
      if (max < temp) {
        max = temp;
      }
    }
    utility = grid_env.reward(i) + gamma * max;
    grid_env.setUtility(utility, i);
  }
}

function doIt () {

  var current_state = grid_env.grid.getCurrentState();
  if (grid_env.grid.isGoalState(current_state) || grid_env.grid.isDoomState(current_state)) {
    // grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
    grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
    grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
    // redraw();
    return;
  }

  // var action = Math.trunc(random(4));
  var action = grid_env.policy(current_state);
  grid_env.act(action);
}

function draw() {
  background(51);
  grid_env.grid.show();
}
