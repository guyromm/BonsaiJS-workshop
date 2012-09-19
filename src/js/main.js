console.log("Start")
define([
  'lib/pubsub',
  'js/screens'
], function(PubSub, Screens){
  /**
   * Root object for this game. Contains generic stuff.
   *
   * @constructor
   * @extends PubSub (.on, .un, .onceOn, .emit)
   */
  function Main(){
    PubSub.call(this); // super();

    // ui system
    this.screens = new Screens(this);

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
      this.screens.add(['loading', 'game']);
      this.emit('next-screen');
    }
  };

  return Main;
});
