/* Edge Wrap Behaviour*/

var EdgeWrap,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EdgeWrap = (function(_super) {
  __extends(EdgeWrap, _super);

  function EdgeWrap(min, max) {
    this.min = min != null ? min : new Vector();
    this.max = max != null ? max : new Vector();
    EdgeWrap.__super__.constructor.apply(this, arguments);
  }

  EdgeWrap.prototype.apply = function(p, dt, index) {
    if (p.pos.x + p.radius < this.min.x) {
      p.pos.x = this.max.x + p.radius;
      p.old.pos.x = p.pos.x;
    } else if (p.pos.x - p.radius > this.max.x) {
      p.pos.x = this.min.x - p.radius;
      p.old.pos.x = p.pos.x;
    }
    if (p.pos.y + p.radius < this.min.y) {
      p.pos.y = this.max.y + p.radius;
      return p.old.pos.y = p.pos.y;
    } else if (p.pos.y - p.radius > this.max.y) {
      p.pos.y = this.min.y - p.radius;
      return p.old.pos.y = p.pos.y;
    }
  };

  return EdgeWrap;

})(Behaviour);
