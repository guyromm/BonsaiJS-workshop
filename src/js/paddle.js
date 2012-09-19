define([], function() {

  /**
   * Paddle constructor, prepares Paddle instances, nothing special
   */
  function Paddle(pong, isAuto, config, position){

    this.isAuto = isAuto;
    this.config = config;
    this.width = 150;
    this.height = 25;

    this.bs = new Group()
      .addTo(pong.container);

    var img = new Bitmap(config.img.src).attr(config.img.attr).addTo(this.bs);

    var rect = new Rect(0, 0, 150, 25, 12).attr({
      fillColor: 'green',
      opacity: 0
    }).addTo(this.bs);

    this.x = position.x;
    this.y = position.y;

    this.setLocation(this.x, this.y)

    this.pong = pong;
  };

   /**
   * The setLocation method is the same for the Ball and
   * Paddle classes, for now, we're just drawing rectangles!
   */
  Paddle.prototype = {
    setLocation: function( x, y ) {

      this.bs.animate('.1s',{
        x: x - this.width / 2,
        y: y - this.height / 2
      });

    },

    /**
     * If this is the TOP paddle
     */
    isTop: function() {
      return this === this.pong.topPaddle;
    },

    /**
     * intersectsBall, determines whether a ball is currently
     * touching the paddle
     */
    intersectsBall: function() {

      var bX = this.pong.ball.x,
        bY = this.pong.ball.y,
        bW = this.pong.ball.width,
        bH = this.pong.ball.height;

      return (
        this.isTop() ?
          (bY - bH/2 <= this.y + this.height/2 && bY + bH/2 > this.y + this.height/2) :
          (bY + bH/2 >= this.y - this.height/2 && bY - bH/2 < this.y - this.height/2)
       ) &&
       bX + bW/2 >= this.x - this.width/2 &&
       bX - bW/2 <= this.x + this.width/2;

    },

    /**
     * Calculate AI movements
     */
    calculateAI: function() {

      var pong = this.pong,
          ball = this.pong.ball;

      if (ball.isMoving) {
        if (Math.abs(ball.x - this.x) < 30) {
          return; // prevent shaking
        }
        if (ball.x > this.x && !this.isAtRightWall()) {
          this.x += this.lastAutoDeltaX = pong.paddleSpeed;
        } else if (ball.x < this.x && !this.isAtLeftWall()) {
          this.x += this.lastAutoDeltaX = -pong.paddleSpeed;
        } else {
          this.lastAutoDeltaX = 0;
        }
      }

    },

    /**
     * Prepares a new frame, by taking into account the current
     * position of the paddle and the ball. setLocation is called
     * at the end to actually draw to the canvas!
     */
    draw: function() {

      var config = this.config,
        pong = this.pong,
        ball = pong.ball,
        ballSpeed = pong.ballSpeed,

        xFromPaddleCenter,
        newDeltaX,
        newDeltaY;

      if (this.isAuto) {

        this.calculateAI();

      } else {

        if ( pong.keyIsDown(config.left) && !this.isAtLeftWall() ) {
          this.x -= pong.paddleSpeed;
        }

        if ( pong.keyIsDown(config.right) && !this.isAtRightWall() ) {
          this.x += pong.paddleSpeed;
        }

      }

      if ( this.intersectsBall() ) {

        xFromPaddleCenter = (ball.x - this.x) / (this.width / 2);
        xFromPaddleCenter = xFromPaddleCenter > 0 ? Math.min(1, xFromPaddleCenter) : Math.max(-1, xFromPaddleCenter);

        if ( Math.abs(xFromPaddleCenter) > 0.5 ) {
          ballSpeed += ballSpeed * Math.abs(xFromPaddleCenter);
        }

        newDeltaX = Math.min( ballSpeed - 2, xFromPaddleCenter * (ballSpeed - 2) );
        newDeltaY = ballSpeed - Math.abs(newDeltaX/2);

        ball.deltaY = this.isTop() ? Math.abs(newDeltaY) : -Math.abs(newDeltaY);
        ball.deltaX = newDeltaX;

      }

      this.setLocation( this.x , this.y );

    },

    /**
     * If the paddle is currently touching the right wall
     */
    isAtRightWall: function() {
      return this.x + this.width/2 >= this.pong.width;
    },

    /**
     * If the paddle is currently touching the left wall
     */
    isAtLeftWall: function() {
      return this.x - this.width/2 <= 0;
    }

  };

  return Paddle;

});
