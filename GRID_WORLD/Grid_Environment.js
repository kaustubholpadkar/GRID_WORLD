

function Grid_Environment (grid) {
  this.grid = grid;

  this.actions = 4;
  this.states = this.grid.row * this.grid.col;
  this.utility = [];

  this.probability = [];
  // initialize probability
  for (var i = 0; i < this.states; i++) {
    temp = [];
    for (var j = 0; j < this.actions; j++) {
      temp.push(0.0);
    }
    this.probability.push(temp);
  }

  for (var i = 0; i < this.states; i++) {
    this.utility.push( Math.floor((Math.random() * 10) + 1) );
  }

  this.initialize = function (start, goal, nothing, doom) {

    this.grid.setStart(start);
    this.grid.set(start);

    for (var i = 0; i < goal.length; i++) {
      this.grid.setGoal(goal[i]);
    }

    for (var i = 0; i < nothing.length; i++) {
      this.grid.setNothing(nothing[i]);
    }

    for (var i = 0; i < doom.length; i++) {
      this.grid.setDoom(doom[i]);
    }
  }

  this.getNextState = function (state, action) {

    if (this.grid.isGoalState(state)) {
      return state;
    }

    if (this.grid.isDoomState(state)) {
      return state;
    }

    var nextState = state;

    var i = Math.trunc(state / this.grid.col);
    var j = Math.trunc(state % this.grid.col);

    switch (action) {

      case 0: // up
        if (i - 1 >= 0) {
          nextState = this.grid.col * (i - 1) + j;
        }
        break;
      case 1: // down
        if (i + 1 < this.grid.row) {
          nextState = this.grid.col * (i + 1) + j;
        }
        break;
      case 2: // left
        if (j - 1 >= 0) {
          nextState = this.grid.col * i + (j - 1) ;
        }
        break;
      case 3: // right
        if (j + 1 < this.grid.col) {
          nextState = this.grid.col * i + (j + 1);
        }
        break;
    }

    if (this.grid.isNothingState(nextState)) {
      nextState = this.grid.col * i + j;
    }

    return nextState;
  }

  this.act = function (action) {
    grid_env.grid.set(grid_env.getNextState(grid_env.grid.getCurrentState(), action));
  }

  this.reward = function (state) {
    return this.grid.getReward(state);
  }

  this.getUtility = function (state) {
    return this.grid.getUtility(state);
  }

  this.setUtility = function (utility, state) {
    this.grid.setUtility(utility, state);
  }

  this.policy = function (state) {
    var nextState;
    var temp;
    var max_utility = -9999;
    var max_i = 0;

    for (var i = 0; i < this.actions; i++) {
      nextState = this.getNextState(state, i);
      temp = this.getUtility(nextState);
      if (max_utility < temp) {
        max_utility = temp;
        max_i = i;
      }
    }

    return max_i;
  }

  this.value_iteration = function (gamma = 0.9) {

    var max;
    var utility;
    var nextState;
    var temp;
    var max_iterations = 1;
    for (var k = 0; k < max_iterations; i++) {
      for (var i = 0; i < this.states; i++) {
        nextState = this.getNextState(i, 0);
        max = this.getUtility(nextState);
        for (var j = 1; j < this.actions; j++) {
          nextState = this.getNextState(i, j);
          temp = this.getUtility(nextState);
          if (max < temp) {
            max = temp;
          }
        }
        utility = this.reward(i) + gamma * max;
        this.setUtility(utility, i);
      }
    }
  }

  this.q_table = [];

  for (var i = 0; i < this.states; i++) {
    var temp = [];
    for (var j = 0; j < this.actions; j++) {
      temp.push(10 * Math.random());
    }
    this.q_table.push(temp);
  }

  this.q_learning = function (gamma = 0.9) {

  }
}
