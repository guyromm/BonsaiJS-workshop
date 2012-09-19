define([], function(){
  function Screen(main){
    this.main = main;

  }

  Screen.list = [
    'loading',
    'game'
  ];

  Screen.create = function(name){
    if (Screen.list.indexOf(name) <= 0) throw 'Screen ['+name+'] not found in the list of screens';
  };

  Screen.prototype = {
    /**
     * @property {Main} main
     */
    main: null,

    /**
     * Show this screen
     *
     * @stub
     */
    show: function(){
      console.warn('Unimplemented stub: show()');
    },
    /**
     * Hide this screen (but do not destroy it)
     *
     * @stub
     */
    hide: function(){
      console.warn('Unimplemented stub: hide()');
    },
    /**
     * Destroy this screen
     *
     * @stub
     */
    destroy: function(){
      console.warn('Unimplemented stub: destroy()');
    },
    /**
     * Reset the screen
     *
     * @stub
     */
    reset: function(){
      console.warn('Unimplemented stub: reset()');
    }
  };

  return Screen;
});
