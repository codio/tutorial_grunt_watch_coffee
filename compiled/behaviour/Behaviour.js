/* Behaviour*/

var Behaviour;

Behaviour = (function() {
  Behaviour.GUID = 0;

  function Behaviour() {
    this.GUID = Behaviour.GUID++;
    this.interval = 1;
  }

  Behaviour.prototype.apply = function(p, dt, index) {
    var _name;
    return (p[_name = '__behaviour' + this.GUID] != null ? p[_name = '__behaviour' + this.GUID] : p[_name] = {
      counter: 0
    }).counter++;
  };

  return Behaviour;

})();
