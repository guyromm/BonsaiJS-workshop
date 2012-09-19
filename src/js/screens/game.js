define([
  'js/screen',
  'js/config'
], function(Screen, config){

  /**
   * @constructor
   * @extends Screen
   * @param {Main} main
   */
  function Game(main){
    Screen.call(this, main); // super()

    this.width = config.viewportSize.w;
    this.height = config.viewportSize.h;
  }

  Game.prototype = {
    __proto__: Screen.prototype, // inheritance

    show: function(){
      this.newGame();
      this.start();
    },

    /**
     * keyIsDown method, used in Paddle instances to determine
     * whether a key is down at any time
     */
    keyIsDown: (function(){

      var keys = {
        37: "left",
        39: "right",
        65: "a",
        83: "s"
      };

      var down = {};

      stage.on('keydown', function(e) {
        var key = e.keyCode;
        down[keys[key]] = true;
      });

      stage.on('keyup', function(e) {
        var key = e.keyCode;
        down[keys[key]] = false;
      });

      return function(key){
        return !!down[key];
      };

    })(),

    /**
     * Starting a new game involves registering the loop
     */
    start: function() {

      var pong = this;

      stage.on('tick', function() {
        pong.draw();
      });

      // Return this for chainability
      return this;

    },

    /**
     * draw, called every few milliseconds to draw each
     * object to the canvas
     */
    draw: function() {
      console.log('Woot I am drawing');
    },

    newGame: function() {
      if (this.container) {
        this.container.destroy();
      }

      this.container = new Group().addTo(stage);

      this.newRound();
    },

    newRound: function() {

    }

  };

  return Game;
});
