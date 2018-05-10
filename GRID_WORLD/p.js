var grid_env;
// var fps = 5;
// var delay;

function setup() {
  // delay = new p5.Delay();
  grid_env = new Grid_Environment(new Grid(50, 50, 3, 4, 80, 80, 15));
  grid_env.initialize(8, [3], [5], [7]);
  // frameRate(fps)
  // grid_env.value_iteration();
  // setInterval(value_iteration, 10);
  // setInterval(doIt, 500);
  createCanvas(900, 650);

  background(51);
}

function play_game (current_state, previous_state, gamma = 0.5) {
  if (grid_env.grid.isGoalState(current_state)) {
    return 1;
  } else if (grid_env.grid.isDoomState(current_state)) {
    return -1;
  }

  var action = Math.trunc(grid_env.actions * Math.random());
  var next_state = grid_env.getNextState(current_state, action);
  var value = play_game(next_state, current_state);
  grid_env.probability[current_state][action] = (value + grid_env.probability[current_state][action])/(1 + value * grid_env.probability[current_state][action]);
  return value * gamma;
}

function p_learning (gamma = 0.5) { 
  var max_iterations = 2000000;

  for (var i = 0; i < max_iterations; i++) {
    grid_env = new Grid_Environment(new Grid(50, 50, 3, 4, 80, 80, 15));
    grid_env.initialize(8, [3], [5], [7]);
    play_game(8, -1);
  }

  /*
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
  */
}

function doIt () {

  var current_state = grid_env.grid.getCurrentState();
  if (grid_env.grid.isGoalState(current_state) || grid_env.grid.isDoomState(current_state)) {
    // grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
    grid_env = new Grid_Environment(new Grid(50, 50, 3, 4, 80, 80, 15));
    grid_env.initialize(8, [3], [5], [7]);
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
