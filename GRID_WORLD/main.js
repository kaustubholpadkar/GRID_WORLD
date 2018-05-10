var x = 10, y = 10;
var tile_width = 80, tile_height = 80, gap = 15;
var row, col;

var cwidth, cheight;

var grid_env;
var canvas;
// var submit;

var is_game = false, is_random = false, is_value = false;

var is_start = false;

var start_state;
var tokens;
var goal;
var nothing;
var doom;

function setup() {
  document.getElementById("form2").style.display = 'none';

  setInterval(value_iteration, 10);
  setInterval(doIt, 500);

  // canvas = createCanvas(900, 650);
  canvas = createCanvas(0, 0);
  background(51);
}

function draw() {
  background(51);
  if (grid_env) {
    grid_env.grid.show();
  }
}

function startGame() {
  document.getElementById("form2").style.display = 'none';

  start_state = parseInt(document.getElementById("start").value);

  tokens = (document.getElementById("goal").value).split(" ");
  // goal = new int[tokens.length];
  goal = [];
  for (var i = 0; i < tokens.length; i++) {
    goal.push(parseInt(tokens[i]));
  }

  tokens = (document.getElementById("nothing").value).split(" ");
  // nothing = new int[tokens.length];
  nothing = [];
  for (var i = 0; i < tokens.length; i++) {
    nothing.push(parseInt(tokens[i]));
  }

  tokens = (document.getElementById("doom").value).split(" ");
  // doom = new int[tokens.length];

  doom = [];
  for (var i = 0; i < tokens.length; i++) {
    doom.push(parseInt(tokens[i]));
  }

  grid_env.initialize(start_state, goal, nothing, doom);
  // grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
  is_start = true;
}



function submitData () {

  document.getElementById("form1").style.display = 'none';

  row = parseInt(document.getElementById("row").value);
  col = parseInt(document.getElementById("col").value);

  console.log(row, col);

  grid_env = new Grid_Environment(new Grid(50, 50, row, col, 80, 80, 15));
  // grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);

  if (document.getElementById("Game").checked) {
    is_game = true;
  } else {
    is_game = false;
  }

  if (document.getElementById("Random").checked) {
    is_random = true;
  } else {
    is_random = false;
  }

  if (document.getElementById("Value").checked) {
    is_value = true;
  } else {
    is_value = false;
  }

  document.getElementById("form2").style.display = 'block';

  cwidth = (col + 1) * (tile_width + gap);
  cheight = (row + 1) * (tile_height + gap);

  resizeCanvas(cwidth, cheight);
}



function keyPressed() {

  if (is_start && is_game) {
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
      // grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
      grid_env = new Grid_Environment(new Grid(50, 50, row, col, 80, 80, 15));
      // grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
      grid_env.initialize(start_state, goal, nothing, doom);
      return;
    }
    grid_env.act(action);
  }
}

function value_iteration (gamma = 0.9) {

  if (is_start && is_value) {
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
}

function doIt () {
  if (is_start && !is_game && !(is_value == false && is_random == false)) {
    var action;
    var current_state = grid_env.grid.getCurrentState();
    if (grid_env.grid.isGoalState(current_state) || grid_env.grid.isDoomState(current_state)) {
      // grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
      grid_env = new Grid_Environment(new Grid(50, 50, row, col, 80, 80, 15));
      // grid_env = new Grid_Environment(new Grid(50, 50, 6, 8, 80, 80, 15));
      // grid_env.initialize(40, [15], [3, 16], [14, 23, 27, 45]);
      grid_env.initialize(start_state, goal, nothing, doom);
      // redraw();
      return;
    }
    if (is_random) {
      action = Math.trunc(random(4));
    } else if (is_value) {
      action = grid_env.policy(current_state);
    }
    // var action = Math.trunc(random(4));
    // var action = grid_env.policy(current_state);
    grid_env.act(action);
  }
}
