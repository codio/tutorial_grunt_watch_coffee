/* Base Renderer*/

var Renderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Renderer = (function() {
  function Renderer() {
    this.setSize = __bind(this.setSize, this);
    this.width = 0;
    this.height = 0;
    this.renderParticles = true;
    this.renderSprings = true;
    this.renderMouse = true;
    this.initialized = false;
    this.renderTime = 0;
  }

  Renderer.prototype.init = function(physics) {
    return this.initialized = true;
  };

  Renderer.prototype.render = function(physics) {
    if (!this.initialized) {
      return this.init(physics);
    }
  };

  Renderer.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
  };

  Renderer.prototype.destroy = function() {};

  return Renderer;

})();
