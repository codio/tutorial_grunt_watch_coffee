var ClothDemo, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClothDemo = (function(_super) {
  __extends(ClothDemo, _super);

  function ClothDemo() {
    _ref = ClothDemo.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ClothDemo.prototype.setup = function(full) {
    var cell, cols, p, rows, s, size, stiffness, sx, sy, x, y, _i, _j;
    if (full == null) {
      full = true;
    }
    ClothDemo.__super__.setup.apply(this, arguments);
    this.renderer.renderParticles = false;
    this.physics.integrator = new Verlet();
    this.physics.timestep = 1.0 / 200;
    this.mouse.setMass(10);
    this.gravity = new ConstantForce(new Vector(0.0, 80.0));
    this.physics.behaviours.push(this.gravity);
    stiffness = 0.5;
    size = full ? 8 : 10;
    rows = full ? 30 : 25;
    cols = full ? 55 : 40;
    cell = [];
    sx = this.width * 0.5 - cols * size * 0.5;
    sy = this.height * 0.5 - rows * size * 0.5;
    for (x = _i = 0; 0 <= cols ? _i <= cols : _i >= cols; x = 0 <= cols ? ++_i : --_i) {
      cell[x] = [];
      for (y = _j = 0; 0 <= rows ? _j <= rows : _j >= rows; y = 0 <= rows ? ++_j : --_j) {
        p = new Particle(0.1);
        p.fixed = y === 0;
        p.moveTo(new Vector(sx + x * size, sy + y * size));
        if (x > 0) {
          s = new Spring(p, cell[x - 1][y], size, stiffness);
          this.physics.springs.push(s);
        }
        if (y > 0) {
          s = new Spring(p, cell[x][y - 1], size, stiffness);
          this.physics.springs.push(s);
        }
        this.physics.particles.push(p);
        cell[x][y] = p;
      }
    }
    p = cell[Math.floor(cols / 2)][Math.floor(rows / 2)];
    s = new Spring(this.mouse, p, 10, 1.0);
    this.physics.springs.push(s);
    cell[0][0].fixed = true;
    return cell[cols - 1][0].fixed = true;
  };

  ClothDemo.prototype.step = function() {
    ClothDemo.__super__.step.apply(this, arguments);
    return this.gravity.force.x = 50 * Math.sin(new Date().getTime() * 0.0005);
  };

  return ClothDemo;

})(Demo);
