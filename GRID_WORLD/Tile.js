var types = [['start', 'blue'], ['goal', 'green'], ['doom', 'red'], ['nothing', 'black'], ['normal', 'white']];

function Tile (x, y, width, height, type, reward = -0.04, utility = 10) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.reward = reward;
  this.utility = utility;
  this.type = type;
  this.col = color(types[this.type][1]);
  this.active = false;
  this.show_reward = true;
  this.show_utility = true;
  this.show_number = true;
  this.number = -1;
  // this.probability = 0;

  this.put = function () {
    this.col = color(types[this.type][1]);
    noStroke();
    fill(this.col);
    rect(this.x, this.y, this.width, this.height);
    if (this.active) {
      this.showAgent();
    }

    if (!this.show_reward) {
      text(this.reward, this.x, this.y);
    }

    if (this.show_utility) {
      text(this.utility.toFixed(2), this.x, this.y);
    }

    if (this.show_number) {
      fill(color('black'));
      text(this.number, this.x + 32, this.y + 45);
    }
  }

  this.showAgent = function () {
    fill(color('pink'));
    ellipse(Math.trunc((this.x + this.x + this.width) / 2), Math.trunc((this.y + this.y + this.height) / 2), 20, 20);
    // ellipse(0, 0, 10, 10);
  }

  this.set = function () {
    this.active = true;
  }

  this.reset = function () {
    this.active = false;
  }

  this.getReward = function () {
    return this.reward;
  }

  this.setReward = function (reward) {
    this.reward = reward;
  }

  this.setUtility = function (utility) {
    this.utility = utility;
  }

  this.getUtility = function () {
    return this.utility;
  }
}
