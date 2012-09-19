console.log("Start")
define([
  'lib/pubsub'
], function(PubSub){
  /**
   * Root object for this game. Contains generic stuff.
   *
   * @constructor
   * @extends PubSub (.on, .un, .onceOn, .emit)
   */
  function Main(){
    PubSub.call(this); // super();

    this.onceOn('init', this.init, this);
  }

  Main.prototype = {
    __proto__: PubSub.prototype, // inheritance

    /**
     * @property {Screens} screens Object that handles showing consecutive screens
     */
    screens: null,

    /**
     * Hook up everything
     */
    init: function(){
      this.onceOn('start', this.start, this);
      this.emit('start');
    },

    /**
     * Initialize the game by queuing up the loading
     * screens and then showing the main menu
     */
    start: function(){

    }
  };

  return Main;
});
