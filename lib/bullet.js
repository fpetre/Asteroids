(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
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
    }
  };


})();