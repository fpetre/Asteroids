(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (gameCanvasEl, uiCanvasEl ) {
    this.keyTriggers = {left: false, right: false, fire: false};
    this.gameCtx = gameCanvasEl.getContext("2d");
    this.uiCtx = uiCanvasEl.getContext("2d");
    this.images = this.makeImages();
    this.dim_x = gameCanvasEl.width;
    this.dim_y = gameCanvasEl.height;
    this.game = new Asteroids.Game(gameCanvasEl.width, gameCanvasEl.height, this.images);
  };

  GameView.prototype.start = function () {
    this.bindKeys();
    this.bindKeyHandlers();
    var throttledFire = _.throttle(this.game.ship.fireBullet.bind(this.game.ship), 100)
    window.setInterval((function () {
      this.game.step();
      this.game.drawGame(this.gameCtx);
      this.game.drawUi(this.uiCtx);
      this.game.keepAsteroidsConstant();
    }).bind(this), 20);

    window.setInterval((function () {
      if (this.keyTriggers['left']) {
        this.game.ship.rotate(-0.05);
      } else if (this.keyTriggers['right']) {
        this.game.ship.rotate(0.05);
      }
      if (this.keyTriggers['fire']) {
        throttledFire();
      }
    }).bind(this), 10);

  };


  GameView.prototype.bindKeys = function () {
    var gameView = this;
    $('body').keydown(function(e){
      if (e.which === 65 || e.which === 37) {
        e.preventDefault();
        gameView.keyTriggers['left'] = true;
      };
    });

    $('body').keyup(function(e){
      if (e.which === 65 || e.which === 37) {
        e.preventDefault();
        gameView.keyTriggers['left'] = false;
      };
    });


    $('body').keydown(function(e){
      if (e.which === 68 || e.which === 39) {
        e.preventDefault();
        gameView.keyTriggers['right'] = true;
      };
    });

    $('body').keyup(function(e){
      if (e.which === 68 || e.which === 39) {
        e.preventDefault();
        gameView.keyTriggers['right'] = false;
      };
    });

    $('body').keydown(function(e){
      if (e.which === 32) {
        e.preventDefault();
        gameView.keyTriggers['fire'] = true;
      };
    });

    $('body').keyup(function(e){
      if (e.which === 32) {
        e.preventDefault();
        gameView.keyTriggers['fire'] = false;
      };
    });




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

    // key('a, left', function () {
    //   if(key.isPressed('a, left')) {
    //   gameview.rotateTriggers['left'] = true;
    //   // gameview.game.ship.rotate(-0.05);
    // } else {
    //   gameview.rotateTriggers['left'] = false;
    // }
    //   return false;
    // });

    // key('d, right', function () {
    //   gameview.game.ship.rotate(0.05);
    //   return false;
    // });

    // key('space', _.throttle(function () {
    //   gameview.game.ship.fireBullet();
    //   return false;
    // },250));

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
