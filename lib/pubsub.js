define([],function(){
  function PubSub(){
    this.handlers = {};
  }

  PubSub.prototype = {
    // actual handlers to fire
    handlers: null,

    /**
     * Register a callback to be fired when emit is called
     * with the same name. There's an optional context.
     * All callbacks are bound to ctxt or null.
     *
     * @param {string} name
     * @param {Function} func
     * @param {Object} [ctxt] func=func.bind(ctxt||null)
     */
    on: function(name, func, ctxt){
      if (!this.handlers[name]) this.handlers[name] = [];
      var bound = tools.hitch(ctxt||null, func);
      this.handlers[name].push(bound);

      return bound;
    },
    /**
     * Register an event to fire once. Deregister it immediately
     * when it fires (even before the callback is called)
     *
     * @param {string} name
     * @param {Function} func
     * @param {Object} [ctxt]
     */
    onceOn: function(name, func, ctxt){
      var closure = function pubsub_onceon(data){
        this.un(name, bound);
        func.call(this, data);
      };

      var bound = this.on(name, closure, ctxt);

      return bound;
    },
    /**
     * Deregister a handler.
     * Note: must supply the result of the same call
     * to .on() because that returns a (new) bound
     * function for the callback supplied.
     *
     * @param {string} name
     * @param {Function} func
     */
    un: function(name, func){
      var pos = this.handlers[name] && this.handlers[name].indexOf(func);
      if (!this.handlers[name] || pos < 0) console.warn('Tried to deregister a func for event ['+name+'] but it is not registered');
      else this.handlers[name].splice(pos, 1);
    },

    /**
     * Fire an event. Calls all callbacks associated with the name of the event.
     *
     * @param {string} name
     * @param {Object} [data]
     */
    emit: function(name, data){
      setTimeout(tools.hitch(this, function(){
        var handlers = this.handlers[name];
        if (handlers) {
          handlers.forEach(function(func){
            func(data);
          });
        }
      }), 20);

      return this;
    },

  };

  return PubSub;
});
