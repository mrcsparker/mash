(function() {
  var Model;

  exports.Model = Model = (function() {
    function Model() {
      this._attributes = {};
    }

    Model.prototype.json = function(jsonString) {
      this.jsonString = jsonString;
      this.json = JSON.parse(this.jsonString);
      return this._mapJson();
    };

    Model.prototype._mapJson = function() {
      var name, value, _ref, _results;
      _ref = this.json;
      _results = [];
      for (name in _ref) {
        value = _ref[name];
        _results.push(this._setValue(name, value));
      }
      return _results;
    };

    Model.prototype._setValue = function(name, value) {
      this._attributes[name] = value;
      return Object.defineProperty(this, name, {
        get: (function(_this) {
          return function() {
            return _this._attributes[name];
          };
        })(this),
        set: (function(_this) {
          return function(_value) {
            return _this._attributes[name] = _value;
          };
        })(this)
      });
    };

    return Model;

  })();

}).call(this);
