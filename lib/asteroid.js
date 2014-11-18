(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (options) {
    this.image = options["image"];
    this.width = 30;
    this.height = 30;
    var args = {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: options["pos"],
      vel: Asteroid.randomVel(),
      game: options["game"]
    };
    Asteroids.MovingObject.call(this, args);
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 10

  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);

  Asteroid.prototype.draw = function (ctx) {
    var image = this.image;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction + Math.PI / 2);
    ctx.drawImage(image, this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
    ctx.restore();
  };


  Asteroid.randomVel = function () {
   var dx = Math.floor(Math.random() * 9 + 1);

   var dy =  Math.floor(Math.random() * 9 + 1);

   var negx = Math.random();
   var negy = Math.random();

   if (negx < 0.5) {

     dx = dx * -1;
   }

   if (negy < 0.5) {
     dy = dy * -1;
   }
   return [dx, dy];
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

})();
