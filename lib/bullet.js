(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    this.game = options["game"];
    args = {
      game: options["game"],
      pos: options["pos"],
      vel: options["vel"],
      radius: Bullet.RADIUS,
      color: Bullet.COLOR
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Bullet);

  Bullet.COLOR = "green";
  Bullet.RADIUS = 2;

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
      if (otherObject.radius === Asteroids.Game.ASTEROID_RADIUS) {
        this.game.score += 100;
        this.game.splitAsteroid(otherObject.radius, otherObject.pos);
      }
      this.game.score += 10;
    }
  };


})();
