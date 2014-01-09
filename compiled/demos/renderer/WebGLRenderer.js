/* WebGL Renderer*/

var WebGLRenderer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

WebGLRenderer = (function(_super) {
  __extends(WebGLRenderer, _super);

  WebGLRenderer.PARTICLE_VS = '\nuniform vec2 viewport;\nattribute vec3 position;\nattribute float radius;\nattribute vec4 colour;\nvarying vec4 tint;\n\nvoid main() {\n\n    // convert the rectangle from pixels to 0.0 to 1.0\n    vec2 zeroToOne = position.xy / viewport;\n    zeroToOne.y = 1.0 - zeroToOne.y;\n\n    // convert from 0->1 to 0->2\n    vec2 zeroToTwo = zeroToOne * 2.0;\n\n    // convert from 0->2 to -1->+1 (clipspace)\n    vec2 clipSpace = zeroToTwo - 1.0;\n\n    tint = colour;\n\n    gl_Position = vec4(clipSpace, 0, 1);\n    gl_PointSize = radius * 2.0;\n}';

  WebGLRenderer.PARTICLE_FS = '\nprecision mediump float;\n\nuniform sampler2D texture;\nvarying vec4 tint;\n\nvoid main() {\n    gl_FragColor = texture2D(texture, gl_PointCoord) * tint;\n}';

  WebGLRenderer.SPRING_VS = '\nuniform vec2 viewport;\nattribute vec3 position;\n\nvoid main() {\n\n    // convert the rectangle from pixels to 0.0 to 1.0\n    vec2 zeroToOne = position.xy / viewport;\n    zeroToOne.y = 1.0 - zeroToOne.y;\n\n    // convert from 0->1 to 0->2\n    vec2 zeroToTwo = zeroToOne * 2.0;\n\n    // convert from 0->2 to -1->+1 (clipspace)\n    vec2 clipSpace = zeroToTwo - 1.0;\n\n    gl_Position = vec4(clipSpace, 0, 1);\n}';

  WebGLRenderer.SPRING_FS = '\nvoid main() {\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);\n}';

  function WebGLRenderer(usePointSprites) {
    var error;
    this.usePointSprites = usePointSprites != null ? usePointSprites : true;
    this.setSize = __bind(this.setSize, this);
    WebGLRenderer.__super__.constructor.apply(this, arguments);
    this.particlePositionBuffer = null;
    this.particleRadiusBuffer = null;
    this.particleColourBuffer = null;
    this.particleTexture = null;
    this.particleShader = null;
    this.springPositionBuffer = null;
    this.springShader = null;
    this.canvas = document.createElement('canvas');
    try {
      this.gl = this.canvas.getContext('experimental-webgl');
    } catch (_error) {
      error = _error;
    } finally {
      if (!this.gl) {
        return new CanvasRenderer();
      }
    }
    this.domElement = this.canvas;
  }

  WebGLRenderer.prototype.init = function(physics) {
    WebGLRenderer.__super__.init.call(this, physics);
    this.initShaders();
    this.initBuffers(physics);
    this.particleTexture = this.createParticleTextureData();
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
    return this.gl.enable(this.gl.BLEND);
  };

  WebGLRenderer.prototype.initShaders = function() {
    this.particleShader = this.createShaderProgram(WebGLRenderer.PARTICLE_VS, WebGLRenderer.PARTICLE_FS);
    this.springShader = this.createShaderProgram(WebGLRenderer.SPRING_VS, WebGLRenderer.SPRING_FS);
    this.particleShader.uniforms = {
      viewport: this.gl.getUniformLocation(this.particleShader, 'viewport')
    };
    this.springShader.uniforms = {
      viewport: this.gl.getUniformLocation(this.springShader, 'viewport')
    };
    this.particleShader.attributes = {
      position: this.gl.getAttribLocation(this.particleShader, 'position'),
      radius: this.gl.getAttribLocation(this.particleShader, 'radius'),
      colour: this.gl.getAttribLocation(this.particleShader, 'colour')
    };
    this.springShader.attributes = {
      position: this.gl.getAttribLocation(this.springShader, 'position')
    };
    return console.log(this.particleShader);
  };

  WebGLRenderer.prototype.initBuffers = function(physics) {
    var a, b, colours, g, particle, r, radii, rgba, _i, _len, _ref;
    colours = [];
    radii = [];
    this.particlePositionBuffer = this.gl.createBuffer();
    this.springPositionBuffer = this.gl.createBuffer();
    this.particleColourBuffer = this.gl.createBuffer();
    this.particleRadiusBuffer = this.gl.createBuffer();
    _ref = physics.particles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      particle = _ref[_i];
      rgba = (particle.colour || '#FFFFFF').match(/[\dA-F]{2}/gi);
      r = (parseInt(rgba[0], 16)) || 255;
      g = (parseInt(rgba[1], 16)) || 255;
      b = (parseInt(rgba[2], 16)) || 255;
      a = (parseInt(rgba[3], 16)) || 255;
      colours.push(r / 255, g / 255, b / 255, a / 255);
      radii.push(particle.radius || 32);
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleColourBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colours), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleRadiusBuffer);
    return this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(radii), this.gl.STATIC_DRAW);
  };

  WebGLRenderer.prototype.createParticleTextureData = function(size) {
    var canvas, ctx, rad, texture;
    if (size == null) {
      size = 128;
    }
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    ctx = canvas.getContext('2d');
    rad = size * 0.5;
    ctx.beginPath();
    ctx.arc(rad, rad, rad, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = '#FFF';
    ctx.fill();
    texture = this.gl.createTexture();
    this.setupTexture(texture, canvas);
    return texture;
  };

  WebGLRenderer.prototype.loadTexture = function(source) {
    var texture,
      _this = this;
    texture = this.gl.createTexture();
    texture.image = new Image();
    texture.image.onload = function() {
      return _this.setupTexture(texture, texture.image);
    };
    texture.image.src = source;
    return texture;
  };

  WebGLRenderer.prototype.setupTexture = function(texture, data) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    return texture;
  };

  WebGLRenderer.prototype.createShaderProgram = function(_vs, _fs) {
    var fs, prog, vs;
    vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(vs, _vs);
    this.gl.shaderSource(fs, _fs);
    this.gl.compileShader(vs);
    this.gl.compileShader(fs);
    if (!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS)) {
      alert(this.gl.getShaderInfoLog(vs));
      null;
    }
    if (!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS)) {
      alert(this.gl.getShaderInfoLog(fs));
      null;
    }
    prog = this.gl.createProgram();
    this.gl.attachShader(prog, vs);
    this.gl.attachShader(prog, fs);
    this.gl.linkProgram(prog);
    return prog;
  };

  WebGLRenderer.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    WebGLRenderer.__super__.setSize.call(this, this.width, this.height);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.useProgram(this.particleShader);
    this.gl.uniform2fv(this.particleShader.uniforms.viewport, new Float32Array([this.width, this.height]));
    this.gl.useProgram(this.springShader);
    return this.gl.uniform2fv(this.springShader.uniforms.viewport, new Float32Array([this.width, this.height]));
  };

  WebGLRenderer.prototype.render = function(physics) {
    var p, s, vertices, _i, _j, _len, _len1, _ref, _ref1;
    WebGLRenderer.__super__.render.apply(this, arguments);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    if (this.renderParticles) {
      vertices = [];
      _ref = physics.particles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        vertices.push(p.pos.x, p.pos.y, 0.0);
      }
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.particleTexture);
      this.gl.useProgram(this.particleShader);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particlePositionBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.particleShader.attributes.position, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.particleShader.attributes.position);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleColourBuffer);
      this.gl.enableVertexAttribArray(this.particleShader.attributes.colour);
      this.gl.vertexAttribPointer(this.particleShader.attributes.colour, 4, this.gl.FLOAT, false, 0, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleRadiusBuffer);
      this.gl.enableVertexAttribArray(this.particleShader.attributes.radius);
      this.gl.vertexAttribPointer(this.particleShader.attributes.radius, 1, this.gl.FLOAT, false, 0, 0);
      this.gl.drawArrays(this.gl.POINTS, 0, vertices.length / 3);
    }
    if (this.renderSprings && physics.springs.length > 0) {
      vertices = [];
      _ref1 = physics.springs;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        s = _ref1[_j];
        vertices.push(s.p1.pos.x, s.p1.pos.y, 0.0);
        vertices.push(s.p2.pos.x, s.p2.pos.y, 0.0);
      }
      this.gl.useProgram(this.springShader);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.springPositionBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.springShader.attributes.position, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.springShader.attributes.position);
      return this.gl.drawArrays(this.gl.LINES, 0, vertices.length / 3);
    }
  };

  WebGLRenderer.prototype.destroy = function() {};

  return WebGLRenderer;

})(Renderer);
