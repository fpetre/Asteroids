(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Ship = Asteroids.Ship = function (options) {
    this.images = options["images"];
    this.direction = -Math.PI / 2;
    this.bulletSpeed = 5;
    this.width = 50;
    this.height = 60;
    var args = {
      game: options["game"],
      pos: options["pos"],
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    };

    Asteroids.MovingObject.call(this, args);

  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Ship);

  Ship.COLOR = "blue";
  Ship.RADIUS = 25;

  Ship.prototype.draw = function (ctx) {
    var image = this.images["ship"];
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction + Math.PI / 2);
    ctx.drawImage(image, this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
    ctx.restore();
  };

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPosition(this.game.dim_x, this.game.dim_y);
    this.vel = [0, 0];
  };

  Ship.prototype.rotate = function (degree) {
    this.direction = this.direction + degree;
  }

  Ship.prototype.power = function (impulse) {
    var xVel = this.vel[0];
    var yVel = this.vel[1];

    var impulseX = Math.cos(this.direction) * impulse;
    var impulseY = Math.sin(this.direction) * impulse;

    var newXVel = xVel + impulseX;
    var newYVel = yVel + impulseY;

    this.vel = [newXVel, newYVel];

  };

  Ship.prototype.fireBullet = function () {
    var xVel = this.vel[0];
    var yVel = this.vel[1];

    var bulletXVel = Math.cos(this.direction) * this.bulletSpeed;
    var bulletYVel = Math.sin(this.direction) * this.bulletSpeed;

    var newBulletXVel = xVel + bulletXVel;
    var newBulletYVel = yVel + bulletYVel;
    var bvel = [newBulletXVel, newBulletYVel];

    bullet = new Asteroids.Bullet ({
      pos: this.pos,
      vel: bvel,
      game: this.game
    });

    this.game.bullets.push(bullet);
  };

})();
