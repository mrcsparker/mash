exports.Model = class Model
  constructor: ->
    @_attributes = {}

  json: (@jsonString) ->
    @json = JSON.parse(@jsonString)
    @_mapJson()

  _mapJson: ->
    for name, value of @json
      @_setValue(name, value)

  _setValue: (name, value) ->
    @_attributes[name] = value

    Object.defineProperty @, name,
      get: => @_attributes[name]
      set: (_value) => @_attributes[name] = _value