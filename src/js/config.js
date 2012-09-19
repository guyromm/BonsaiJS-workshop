// static configuration for the app (dont store dynamic settings in here!)
// note: do not include data here. it already depends on config.
define([], function(){
  return {
    // stuff should be relative to this size
    viewportSize: {
      w: 768,
      h: 1024
    },
    paddleSpeed: 17,
    ballSpeed: 17,
    topPaddle: {
      width: 125,
      height: 50,
      left: "a",
      right: "s",
      img: {
        src: 'img/paddle-top.png',
        attr: {
          width: 184,
          height: 58,
          x: -18,
          y: -21,
        }
      }
    },
    bottomPaddle: {
      width: 125,
      height: 50,
      left: "left",
      right: "right",
      img: {
        src: 'img/paddle-bottom.png',
        attr: {
          width: 184,
          height: 58,
          x: -18,
          y: -11,
        }
      }
    },
    ball: {
      width: 54,
      height: 54
    },
    topPlayer: {
      score: {
        x: 768 - 20,
        y: 20,
        rotation: Math.PI
      }
    },
    bottomPlayer: {
      score: {
        y: 1024 - 35,
        x: 20
      }
    }
  };
});

