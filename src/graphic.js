function SnakeGraphic(canvasId, field, blockSize, offset) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  this.field = field;
  this.blockSize = blockSize;
  this.offset = offset;
  this.init();
  this.reset();
}

SnakeGraphic.prototype.init = function() {
  this.canvas.width = this.field.x * this.blockSize.x + this.offset;
  this.canvas.height = this.field.y * this.blockSize.y + this.offset;
};

/**
 * Reset the board
 */
SnakeGraphic.prototype.reset = function() {
  //draw the margin
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(
    0,
    0,
    this.field.x * this.blockSize.x + this.offset,
    this.blockSize.y * this.field.y + this.offset
  );
  this.ctx.strokeStyle = 'yellow';
  this.ctx.lineWidth = 2;
  this.ctx.strokeRect(
    this.offset / 2 - 1,
    this.offset / 2 - 1,
    this.canvas.width - this.offset + 2,
    this.canvas.height - this.offset + 2
  );

  this.oldSnake = [];
  this.oldScore = 0;
  this.setScore(0);
};

/**
 * Set the apple position
 * @param {{x: Number, y: Number}} pos, position of where to set the apple
 */
SnakeGraphic.prototype.setApple = function(pos) {
  this.apple = pos;
};

SnakeGraphic.prototype.setScore = function(score) {
  this.ctx.font = '30px Arial';
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, 200, 30);
  this.ctx.fillStyle = 'yellow';
  this.ctx.fillText(score, 10, 30);
};

SnakeGraphic.prototype.setHighScore = function(highScore) {
  this.ctx.font = '30px Arial';
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, 700, 30);
  this.ctx.fillStyle = 'red';
  this.ctx.fillText(highScore, 10, 30);
};

/**
 * Draw the snake and the apple
 * @param {[{x: Number, y: Number}]} snake
 */
SnakeGraphic.prototype.draw = function(snake) {
  //remove the old snake (fill the old snake with black)
  for (var i = 0; i < this.oldSnake.length; i++) {
    this.fillCell(this.oldSnake[i], 'black');
  }
  //draw the new snake
  this.oldSnake = snake.slice();
  for (var i = 0; i < snake.length; i++) {
    this.fillCell(snake[i],'white');
  }
  //Draw the apple
  this.fillCell(this.apple, 'red');
};

/**
 * Fill a cell inside the field with the given color
 * @param {{x: Number, y: Number}} cellPos, pos of the cell to be filled
 * @param {string} color, color to fill the cell with
 */
SnakeGraphic.prototype.fillCell = function(cellPos, color) {
  if (this.isInTheField(cellPos)) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.blockSize.x * cellPos.x + this.offset / 2,
      this.blockSize.y * cellPos.y + this.offset / 2,
      this.blockSize.x,
      this.blockSize.y
    );
  }
};

/**
 * Check if a point is inside the field
 * @param {{x: Number, y: Number}} point
 * @return boolean point, true if the point is in the board, false otherwise
 */
SnakeGraphic.prototype.isInTheField = function(point) {
  return (
    point.x >= 0 &&
    point.x < this.field.x &&
    point.y >= 0 &&
    point.y < this.field.y
  );
};
