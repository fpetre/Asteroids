(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
    Asteroids.Util = {};
  }

  var Util = Asteroids.Util = function () {};


  Util.inherits = function (Parent, Child) {
    function Surrogate() {};
    Child.prototype.$super = Parent;
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
  };

  Util.normalize = function (vel) {
    var xVel = vel[0];
    var yVel = vel[1];
    var length = Math.floor(Math.sqrt((xVel * xVel) + (yVel * yVel)));
    return [Math.floor(xVel/length), Math.floor(yVel/length)];
  };

  Util.vectorLength = function (vector) {
    var xvel = vector[0];
    var yvel = vector[1];
    var length = Math.floor(Math.sqrt((xvel * xvel) + (yvel * yvel)));
    return length;
  }




})();
