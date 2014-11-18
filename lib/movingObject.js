(function(){

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject =  function (arg) {
    this.pos = arg["pos"];
    this.vel = arg["vel"];
    this.radius = arg["radius"];
    this.color = arg["color"];
    this.game = arg["game"];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
      );

    ctx.fill();
  };

  MovingObject.prototype.isOffBoard = function () {
    var x = this.pos[0];
    var y = this.pos[1];
    return x <= 0 || y <= 0 || x >= this.game.dim_x || y >= this.game.dim_y;
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this instanceof Asteroids.Bullet) {
      if (this.isOffBoard()) {
        this.game.remove(this);
      }
    }
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var radiiSum = this.radius + otherObject.radius;
    function distance (pos1, pos2) {
      var x1 = pos1[0];
      var x2 = pos2[0];
      var y1 = pos1[1];
      var y2 = pos2[1];
      var squared = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) ;
      return Math.pow(squared, 0.5);
    };

    if (radiiSum >= distance(this.pos, otherObject.pos)) {
      return true;
    }else {
      return false;
    }
  };


  MovingObject.prototype.collideWith = function (otherObject) {

  }

})();