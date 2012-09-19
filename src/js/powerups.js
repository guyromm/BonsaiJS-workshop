define([
  'js/powerups/aggressive'
], function(Aggressive) {
  var powerups = {
    powerups: [
      Aggressive
    ],
    init: function(ball) {
      this.ball = ball;

      this.destroy();
      this.initTimer();
    },
    initTimer: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      var self = this;
      this.timer = setTimeout(function power() {
        self.create();
      }, Math.round((Math.random()*20000) + 5000));
    },
    create: function() {
      this.powerup = new (this.powerups[Math.floor(Math.random() * this.powerups.length)])(this.ball);
    },
    destroy: function() {
      if (this.powerup) {
        this.powerup.destroy();
      }
    },
    draw: function() {
      if (!this.powerup) {
        return;
      }
      // Check if it collides with ball
      if (Math.pow(Math.pow(this.ball.x-this.powerup.x,2)+Math.pow(this.ball.y-this.powerup.y,2),0.5) <= this.ball.radius + this.powerup.radius) {
        this.powerup.hit();
        delete this.powerup;
        this.initTimer();
      }
    }
  };
  return powerups;
});
