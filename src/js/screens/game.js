define([
  'js/screen',
  'js/config',
  'js/ball',
  'js/paddle'
], function(Screen, config, Ball, Paddle){

  /**
   * @constructor
   * @extends Screen
   * @param {Main} main
   */
  function Game(main){
    Screen.call(this, main); // super()

    this.width = config.viewportSize.w;
    this.height = config.viewportSize.h;

    this.paddleSpeed = config.paddleSpeed;
    this.ballSpeed = config.ballSpeed;
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
      this.ball.draw();
      this.topPaddle.draw();
      this.bottomPaddle.draw();
    },

    newGame: function() {
      if (this.container) {
        this.container.destroy();
      }

      this.container = new Group().addTo(stage);

      this.topPaddle = new Paddle(this, true, config.topPaddle, {
        x: this.width /  2,
        y: config.ball.height + config.topPaddle.height
      });

      var userPaddle = this.bottomPaddle = new Paddle(this, false, config.bottomPaddle, {
        x: this.width /  2,
        y: this.height - config.ball.height - config.bottomPaddle.height
      });

      stage.on('pointermove', function(e) {
        userPaddle.x = e.stageX;
      });

      this.newRound();
    },

    newRound: function() {

      // Remove old ball
      if (this.ball) {
        var oldBall = this.ball;
        oldBall.bs.animate('.5s', {
          opacity: 0
        }, {
          onEnd: function() {
            oldBall.bs.remove(); // clear old ball
          }
        });
      }

      // Create new ball
      this.ball = new Ball(this, config.ball, {
        x: this.width /  2,
        y: this.height / 2
      });

      var ball = this.ball;
      ball.bs.attr({ opacity: 0 }).animate('.5s', {
        opacity: 1
      }, {
        onEnd: function() {
          setTimeout(function() {
            ball.start();
          }, 1000)
        }
      });
    }

  };

  return Game;
});
