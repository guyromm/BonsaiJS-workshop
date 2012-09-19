define([], function() {
  Player = function(pong, config) {
    this.pong = pong;
    this.init(config);
  };

  Player.prototype = {
    score: 0,
    init: function(config) {
      this.text = new Text('000').addTo(this.pong.container).attr({
        fontFamily: new FontFamily('Orbitron', [
          'fonts/Orbitron-Medium.ttf'
        ]),
        filters: [filter.dropShadow(0, 0, 10, '#00e4ff')],
        fontSize: 50,
        textFillColor: '#00e4ff'
      });

      this.text.attr(config.score);
    },
    won: function() {
      this.score++;
      this.updateScore();
    },
    updateScore: function() {
      this.text.attr('text', ("000" + this.score).slice(-3));
    }
  };

  return Player;
});
