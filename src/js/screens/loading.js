define([
  'js/screen',
  'js/config'
], function(Screen, config){
  /**
   * @constructor
   * @extends Screen
   * @param {Main} main
   */
  function Loading(main){
    Screen.call(this, main); // super()
  }

  Loading.prototype = {
    __proto__: Screen.prototype, // inheritance

    /**
     * @property {Group} container The entire screen, if cached
     */
    container: null,

    hide: function() {
      if (this.container) {
        this.container.animate('.3s', {
          opacity: 0
        }, {
          onEnd: tools.hitch(this, function() {
            this.container.destroy();
            delete this.container;
          })
        })
      }
    },

    show: function(){
      this.reset();
      var self = this;
      setTimeout(function() {
        self.main.emit('next-screen');
      }, 1000);
    },

    reset: function(){
      if (!this.container) this.setupUi();
    },

    remove: function(){
      this.container.remove();
      // destroy stones?
    },

    destroy: function(){
      if (this.isCached) {
        this.untick();
        this.container.destroy();
        // destroy stones
        this.menus = null;
        this.container = null;
        if (this.game) {
          this.game.destroy();
          this.game = null;
        }
      }
    },

    setupUi: function(){
      var container = this.container = new Group().attr({
        x: 0,
        y: 0,
        width: config.viewportSize.w,
        height: config.viewportSize.h
      }).addTo(stage);

      this.text = new Text('Loading').addTo(container).attr({
        x: 275,
        y: 525,
        fontFamily: new FontFamily('Orbitron', [
          'fonts/Orbitron-Medium.ttf'
        ]),
        filters: [filter.dropShadow(0, 0, 10, '#00e4ff')],
        fontSize: 50,
        textFillColor: '#00e4ff'
      });
    }
  };

  return Loading;

});
