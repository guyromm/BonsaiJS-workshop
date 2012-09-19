define([
  'js/screens/loading',
  'js/screens/game',
], function(
  Loading,
  Game
){
  /**
   * Handler of screens. Shows and hides different views.
   *
   * @constructor
   * @param {Main} main
   */
  function Screens(main){
    this.main = main;

    this.screens = [];
    this.main.on('next-screen', this.next, this);

    // copy screen subclasses and create new instances
    this.byName = {};
    for (var key in Screens.byName) {
      console.log(Screens.byName[key])
      this.byName[key] = new (Screens.byName[key])(main);
    }
  }

  Screens.byName = {
    loading: Loading,
    game: Game
  };

  Screens.prototype = {
    /**
     * @property {Main} main
     */
    main: null,

    /**
     * @property {Screen[]} screens List of screens to show consecutively
     */
    screens: null,

    /**
     * @property current Current visible screen
     */

    /**
     * Add a screen to the queue of screens to be shown sequentially
     *
     * @param {string|string[]} screen
     */
    add: function(screen){
      console.log("Adding: "+screen);
      if (screen instanceof Array) {
        screen.forEach(function(screen){
          this.add(screen);
        },this);
      } else {
        this.screens.push(screen);
      }
    },

    /**
     * Start showing the next screen in the queue
     */
    next: function(){
      var next = this.screens.shift();
      if (next) {
        console.log("Showing next screen: "+next);
        if (!this.byName[next]) console.warn('Tried to open an unknown screen ['+next+']');
        else {
          this.current && this.current.hide();
          this.current = this.byName[next];
          this.current.show();
        }
      } // else; have to wait for input (menu selection, etc)
    },
  };

  return Screens;
});
