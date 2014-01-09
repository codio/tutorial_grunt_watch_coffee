/* Edge Bounce Behaviour*/

var EdgeBounce,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EdgeBounce = (function(_super) {
  __extends(EdgeBounce, _super);

  function EdgeBounce(min, max) {
    this.min = min != null ? min : new Vector();
    this.max = max != null ? max : new Vector();
    EdgeBounce.__super__.constructor.apply(this, arguments);
  }

  EdgeBounce.prototype.apply = function(p, dt, index) {
    if (p.pos.x - p.radius < this.min.x) {
      p.pos.x = this.min.x + p.radius;
    } else if (p.pos.x + p.radius > this.max.x) {
      p.pos.x = this.max.x - p.radius;
    }
    if (p.pos.y - p.radius < this.min.y) {
      return p.pos.y = this.min.y + p.radius;
    } else if (p.pos.y + p.radius > this.max.y) {
      return p.pos.y = this.max.y - p.radius;
    }
  };

  return EdgeBounce;

})(Behaviour);
