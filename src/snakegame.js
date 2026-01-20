function Game(canvasId) {
  this.field = { x: 20, y: 20 };
  this.blockSize = { x: 20, y: 20 };
  this.graphic = new SnakeGraphic(canvasId, this.field, this.blockSize, 100);
  var self = this;
  document.addEventListener('keydown', function(ev) {
    self.keypress(ev, self);
  });
  this.snake = new Snake(this.field);
  this.generateRandomApple();
  this.score = 0;
  this.highScore = 0;

  self.graphic.setScore(self.score);

  var ctx = this;
  window.touchManager.onSwipeLeft = function() {
    ctx.snake.setDirection(Directions.LEFT);
  };
  window.touchManager.onSwipeRight = function() {
    ctx.snake.setDirection(Directions.RIGHT);
  };
  window.touchManager.onSwipeUp = function() {
    ctx.snake.setDirection(Directions.UP);
  };
  window.touchManager.onSwipeDown = function() {
    ctx.snake.setDirection(Directions.DOWN);
  };
}

Game.prototype.start = function() {
  setInterval(this.update, 100, this);
};

Game.prototype.generateRandomApple = function() {
  this.apple = {
    x: Math.floor(Math.random() * this.field.x),
    y: Math.floor(Math.random() * this.field.y)
  };
  this.graphic.setApple(this.apple);
};

Game.prototype.keypress = function(ev, self) {
  switch (ev.keyCode) {
    case 37:
    case 65:
      self.snake.setDirection(Directions.LEFT);
      break;
    case 38:
    case 87:
      self.snake.setDirection(Directions.UP);
      break;
    case 39:
    case 68:
      self.snake.setDirection(Directions.RIGHT);
      break;
    case 40:
    case 83:
      self.snake.setDirection(Directions.DOWN);
      break;
  }
};

Game.prototype.update = function(self) {
  self.snake.move();
  if (self.snake.isDead()) {
    self.score = 0;
    self.graphic.reset();
    self.snake.respawn();
  }
  if (self.snake.isOn(self.apple)) {
    self.snake.grow();
    self.generateRandomApple();
    self.score += 100;
    if (self.score > self.highScore){
      self.highScore = self.score;
    }
    self.graphic.setScore(self.score);
    self.graphic.setHighScore(self.highScore);
  }
  self.graphic.draw(self.snake.get());
};
