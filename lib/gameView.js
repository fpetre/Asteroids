(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvasEl, images) {
    this.ctx = canvasEl.getContext("2d");
    this.dim_x = canvasEl.width;
    this.dim_y = canvasEl.height;
    this.game = new Asteroids.Game(canvasEl.width, canvasEl.height, images);
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
    },500));

  };
})();
