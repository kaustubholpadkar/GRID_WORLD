// m x n grid
function Grid (x, y, row, col, tile_width, tile_height, gap) {

  this.x = x;
  this.y = y;
  this.row = row;
  this.col = col;
  this.gap = gap;
  this.tile_width = tile_width;
  this.tile_height = tile_height;
  this.tiles = [];
  this.current_state = 0;

  for (var i = 0; i < this.row; i++) {
    var yy = this.y + this.tile_height * i + gap * i;
    var temp = [];

    for (var j = 0; j < this.col; j++) {
      var xx = this.x + this.tile_width * j + gap * j;
      temp.push(new Tile(xx, yy, this.tile_width, this.tile_height, 4));
    }
    this.tiles.push(temp);
  }

  for (var i = 0; i < this.row; i++) {
    for (var j = 0; j < this.col; j++) {
      this.tiles[i][j].number = i * col + j;
    }
  }


  this.show = function () {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        this.tiles[i][j].put();
      }
    }
  }
/*
  this.setStart = function (n) {
    var i = Math.trunc(n / col);
    var j = Math.trunc(n % col);
    this.tiles[i][j].type = 0;
  }
*/
  this.setStart = function (i, j = -1) {
    // console.log(i, j);
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.tiles[i][j].type = 0;
  }
/*
  this.setGoal = function (n) {
    var i = Math.trunc(n / col);
    var j = Math.trunc(n % col);
    this.tiles[i][j].type = 1;
  }
*/
  this.setGoal = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.setReward(1, i, j);
    this.tiles[i][j].type = 1;
  }

  this.isGoalState = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return (this.tiles[i][j].type == 1);
  }
/*
  this.setDoom = function (n) {
    var i = Math.trunc(n / col);
    var j = Math.trunc(n % col);
    this.tiles[i][j].type = 2;
  }
*/
  this.setDoom = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.setReward(-1, i, j);
    this.tiles[i][j].type = 2;
  }

  this.isDoomState = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }

    return (this.tiles[i][j].type == 2);
  }
/*
  this.setNothing = function (n) {
    var i = Math.trunc(n / col);
    var j = Math.trunc(n % col);
    this.tiles[i][j].type = 3;
  }
*/
  this.setNothing = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.setReward(-0.04, i, j);
    this.tiles[i][j].type = 3;
  }

  this.isNothingState = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return (this.tiles[i][j].type == 3);
  }


  this.setNormal = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }

    this.setReward(-0.04, i, j);
    this.tiles[i][j].type = 4;
  }

  this.isNormalState = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return (this.tiles[i][j].type == 4);
  }

  this.set = function (i, j = -1) {
    this.resetAll();
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.tiles[i][j].set();
    this.setCurrentState(i, j);
  }

  this.reset = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.tiles[i][j].reset();
  }

  this.resetAll = function () {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        this.reset(i, j);
      }
    }
  }

  this.isActive = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return (this.tiles[i][j].active);
  }

  this.setCurrentState = function (i, j = -1) {
    if (j == -1) {
      this.current_state = i;
      return;
    }
    this.current_state = i * this.col + j;
  }

  this.getCurrentState = function () {
    return this.current_state;
  }

  this.setReward = function (reward, i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.tiles[i][j].setReward(reward);
  }

  this.getReward = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return this.tiles[i][j].getReward();
  }

  this.setUtility = function (utility, i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    this.tiles[i][j].setUtility(utility);
  }

  this.getUtility = function (i, j = -1) {
    if (j == -1) {
      var n = i;
      i = Math.trunc(n / col);
      j = Math.trunc(n % col);
    }
    return this.tiles[i][j].getUtility();
  }
}
