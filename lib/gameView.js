(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvasEl, images) {
    this.ctx = canvasEl.getContext("2d");
    this.images = this.makeImages();
    this.dim_x = canvasEl.width;
    this.dim_y = canvasEl.height;
    this.game = new Asteroids.Game(canvasEl.width, canvasEl.height, this.images);
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameview = this;
    key('w, up', function () {
      gameview.game.ship.power(1);
      return false;
    });

    key('s, down', function () {
      gameview.game.ship.power(-1);
      return false;
    });

    key('a, left', function () {
      gameview.game.ship.rotate(-0.25);
      return false;
    });

    key('d, right', function () {
      gameview.game.ship.rotate(0.25);
      return false;
    });

    key('space', _.throttle(function () {
      gameview.game.ship.fireBullet();
      return false;
    },250));

  };

  GameView.prototype.makeImages = function () {
    var asteroidImages = new Array(7);
    for (var i = 0; i < asteroidImages.length; i++) {
      asteroidImages[i] = new Image();
    }
    asteroidImages[0].src = "assets/asteroid.png";
    asteroidImages[1].src = "assets/asteroid-piece1.png"
    asteroidImages[2].src = "assets/asteroid-piece2.png";
    asteroidImages[3].src = "assets/asteroid-piece3.png";
    asteroidImages[4].src = "assets/asteroid-piece4.png";
    asteroidImages[5].src = "assets/asteroid-piece5.png";
    asteroidImages[6].src = "assets/asteroid-piece6.png";

    var shipImage = new Image();
    shipImage.src = "assets/speedship.png";
    var backgroundImage = new Image();
    backgroundImage.src = "assets/space-background.jpg";
    var images = {
      asteroids: asteroidImages,
      background: backgroundImage,
      ship: shipImage
      };

    return images;
  };


})();
