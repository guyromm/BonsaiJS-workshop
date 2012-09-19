define([], function() {
  function Aggressive(ball) {
    this.ball = ball;
    this.init();
  }

  Aggressive.prototype = {
    init: function() {
      this.radius = 18;
      this.x = Math.round(Math.random() * 728) + 20;
      this.y = Math.round(Math.random() * 700) + 150;

      this.powerup = new Group()
        .attr({
          x: this.x,
          y: this.y,
          width: 36,
          height: 36
        })
        .addTo(this.ball.pong.container);

      new Circle(0, 0, this.radius)
      .attr({
        fillColor: 'green',
        opacity: 0,
        x: 0,
        y: 0
      })
      .addTo(this.powerup);

      new Bitmap('img/powerup-aggressive.png')
        .attr({
          width: 46,
          height: 46,
          x: -23,
          y: -23,
          opacity: 0
        })
        .addTo(this.powerup)
        .animate('3s', {
          opacity: 1
        });
    },

    destroy: function() {
      this.powerup.animate('.3s', {
        opacity: 0,
        scale: 1.3
      }, {
        onEnd: tools.hitch(this, function() {
          this.powerup.destroy();
          delete this.powerup;
        })
      });
    },

    hit: function() {
      this.ball.deltaX *= 2;
      this.ball.deltaY *= 2;

      this.destroy();
    }
  };

  return Aggressive;
});
