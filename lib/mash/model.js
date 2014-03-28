(function() {
  var Model;

  exports.Model = Model = (function() {
    function Model() {
      this._attributes = {};
      this._belongsToAssociations = {};
      this._hasManyAssociations = {};
      this._setAssociations();
    }

    Model.prototype.belongsTo = function() {
      return [];
    };

    Model.prototype.hasMany = function() {
      return [];
    };

    Model.prototype.json = function(jsonString) {
      this.jsonString = jsonString;
      this.json = JSON.parse(this.jsonString);
      return this._mapJson();
    };

    Model.prototype.jsonObj = function(json) {
      this.json = json;
      return this._mapJson();
    };

    Model.prototype._setAssociations = function() {
      var association, type, _i, _len, _ref, _results;
      _ref = ['belongsTo', 'hasMany'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this[type]();
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            association = _ref1[_j];
            if (Array.isArray(association)) {
              association = association[0];
            }
            if (type === 'hasMany') {
              this._hasManyAssociations[association.name.toLowerCase() + 's'] = association;
            } else if (type === 'belongsTo') {
              this._belongsToAssociations[association.name.toLowerCase()] = association;
            }
            _results1.push(association);
          }
          return _results1;
        }).call(this));
      }
      return _results;
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

    Model.prototype._getValue = function(name, value) {
      var association, model, models, v, _i, _len;
      if (this._belongsToAssociations[name] != null) {
        association = this._belongsToAssociations[name];
        model = new association();
        model.jsonObj(value);
        return model;
      } else if (this._hasManyAssociations[name] != null) {
        models = [];
        association = this._hasManyAssociations[name];
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          v = value[_i];
          model = new association();
          model.jsonObj(v);
          models.push(model);
        }
        return models;
      } else {
        return value;
      }
    };

    Model.prototype._setValue = function(name, value) {
      this._attributes[name] = this._getValue(name, value);
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
