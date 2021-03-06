(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (dim_x, dim_y, images) {
    this.score = 0;
    this.dim_x = dim_x;
    this.dim_y = dim_y;
    this.images = images;
    this.asteroids = this.addAsteroids()
    this.ship = new Asteroids.Ship({
      pos: Game.randomPosition(dim_x, dim_y),
      game: this,
      images: images
    });
    this.bullets = [];
  };

  Game.NUM_ASTEROIDS = 4;
  Game.ASTEROID_RADIUS = 50;


  Game.prototype.asteroidPieces = function () {
    var asteroidPieces = [];
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].radius !== Game.ASTEROID_RADIUS) {
        asteroidPieces.push(this.asteroids[i]);
      }
    }
    return asteroidPieces;
  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];

    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var pos = Game.randomPosition(this.dim_x, this.dim_y)
      asteroids.push(
        new Asteroids.Asteroid({ pos: pos, game: this, image: this.images["asteroids"][0], radius: Game.ASTEROID_RADIUS })
      );
    };

    return asteroids;
  };


  Game.prototype.addAsteroid = function () {
    var pos = Game.randomPosition(this.dim_x, this.dim_y)
    this.asteroids.push(
      new Asteroids.Asteroid({ pos: pos, game: this, image: this.images["asteroids"][0], radius: Game.ASTEROID_RADIUS })
    );
  };

  Game.prototype.splitAsteroid = function (radius, pos) {
    var newRadius = Math.floor(radius / 3);

    for (var i = 1; i < 7; i++) {

      var newAsteroid = new Asteroids.Asteroid({pos: pos, game: this, image: this.images["asteroids"][i], radius: newRadius});
      this.asteroids.push(newAsteroid);
    };
  };


  Game.prototype.keepAsteroidsConstant = function () {
    var numAsteroidPieces = this.asteroidPieces().length;
    var numWholeAsteroids = (this.asteroids.length - numAsteroidPieces);

    if ( ( (numAsteroidPieces / 6) + numWholeAsteroids ) < Game.NUM_ASTEROIDS - 1) {
      this.addAsteroid();
    }

  };


  Game.randomPosition = function (dim_x, dim_y) {
    var x = Math.floor( Math.random() * dim_x );
    var y = Math.floor( Math.random() * dim_y );
    return [ x, y ];
  };

  Game.prototype.allObjects = function () {
    var all = this.asteroids.slice();
    all = all.concat(this.bullets.slice());
    all.push(this.ship);
    return all;
  };

  Game.prototype.drawGame  = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    ctx.drawImage(this.images["background"], 0, 0, this.dim_x, this.dim_y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };


  Game.prototype.drawUi = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    ctx.font = '20pt Arial';
    ctx.textAlign = 'start';
    ctx.fillStyle = "white";
    ctx.fillText("score: " + this.score, 20, 30);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0] % this.dim_x;
    var y = pos[1] % this.dim_y;

    if (x < 0) {
      x += this.dim_x;
    }

    if (y < 0) {
      y += this.dim_y;
    }

    return [ x, y ];
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.allObjects().forEach(function (object, index) {
      for (var i = 0; i < game.allObjects().length; i++) {
        if (index !== i) {
          if (object.isCollidedWith(game.allObjects()[i])) {
            object.collideWith(game.allObjects()[i]);
          }
        }
      };
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    var aIndex = this.asteroids.indexOf(object);
    if ( aIndex !== -1) {
      this.asteroids.splice(aIndex, 1);
    }
    var bIndex = this.bullets.indexOf(object);
    if ( bIndex !== -1) {
      this.bullets.splice(bIndex, 1);
    }
  };

})();
