define([], function() {

  /**
   * Ball constructor, prepares Ball instances,
   * determines initial deltaX and deltaY fields
   * dependent on specified ballSpeed. E.g. if we want
   * a speed of 5, then we must make sure that:
   * Math.abs(deltaX) + Math.abs(deltaY) === 5
   */
  function Ball(pong, config, position){

    this.config = config;
    this.width = 46;
    this.height = 46;
    this.radius = 23;

    this.bs = new Group();

    var collision = new Rect(0, 0, 46, 46, 23)
      .attr({
        fillColor: 'green',
        opacity: 0
      })
      .addTo(this.bs);

    var img = new Bitmap('img/disc.png').attr({
      width: 54,
      height: 54,
      x: -5,
      y: -5
    }).addTo(this.bs);

    this.deltaY = Math.floor(Math.random() * pong.ballSpeed) + 1;
    this.deltaX = pong.ballSpeed - this.deltaY;

    // Half the time, we want to reverse deltaY
    // (making the ball begin in a random direction)
    if ( Math.random() > 0.5 ) {
      this.deltaY = -this.deltaY;
    }

    // Half the time, we want to reverse deltaX
    // (making the ball begin in a random direction)
    if ( Math.random() > 0.5 ) {
      this.deltaX = -this.deltaX;
    }

    this.x = position.x;
    this.y = position.y;

    this.pong = pong;
    this.isInitiated = false;

    this.setLocation(this.x, this.y);
    this.bs.addTo(pong.container);

  }

  Ball.prototype = {
    setLocation: function( x, y ) {

      this.bs.attr({
        x: x - this.width / 2,
        y: y - this.height / 2
      });

    },

    start: function() {
      this.isInitiated = true;
    },

    /**
     * If the ball is currently touching a wall
     */
    isAtWall: function() {
      return this.x + this.width/2 >= this.pong.width || this.x - this.width/2 <= 0;
    },

    /**
     * If the ball is currently at the top
     */
    isAtTop: function() {
      return this.y + this.height/2 <= 0;
    },

    /**
     * If the paddle is currently at the bottom
     */
    isAtBottom: function() {
      return this.y - this.height/2 >= this.pong.height;
    },

    /**
     * Simply continues the progression of the ball, by
     * setting the location to the prepared x/y values
     */
    persist: function() {
      this.setLocation(
        this.x,
        this.y
      );
    },

    /**
     * Prepares the ball to be drawn to the canvas,
     * to bounce the ball off the walls, the deltaX
     * field is simply inverted (+5 becomes -5).
     */
    draw: function() {

      if (!this.isInitiated) {
        return;
      }

      if ( this.isAtWall() ) {
        this.deltaX = -this.deltaX;
      }

      if ( this.isAtBottom() ) {
        this.pong.newRound();
        return;
      } else if ( this.isAtTop() ) {
        this.pong.newRound();
        return;
      }

      this.isMoving = true;

      this.x = this.x + this.deltaX;
      this.y = this.y + this.deltaY;

      this.persist();

    }

  };

  return Ball;
});
