// https://github.com/uxebu/bikeshed/wiki/Plugins

bonsai.DisplayObject.prototype.fadestroy = function(time, delay){
  var bs = this;
  // yep, very aggressive cleanup
  var obj = {delay:delay, onEnd: function(){ bs.destroy(); bs = null; obj.onEnd=null; obj = null; }};
  this.animate(time, {opacity:0}, obj)
};
