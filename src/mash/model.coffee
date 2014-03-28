exports.Model = class Model
  constructor: ->
    @_attributes = {}
    @_belongsToAssociations = {}
    @_hasManyAssociations = {}

    @_setAssociations()

  belongsTo: -> []
  hasMany: -> []

  json: (@jsonString) ->
    @json = JSON.parse(@jsonString)
    @_mapJson()

  jsonObj: (@json) ->
    @_mapJson()

  _setAssociations: ->
    for type in ['belongsTo', 'hasMany']
      for association in @[type]()
        if Array.isArray association
          association = association[0]

        if type is 'hasMany'
          @_hasManyAssociations[association.name.toLowerCase() + 's'] = association
        else if type is 'belongsTo'
          @_belongsToAssociations[association.name.toLowerCase()] = association

        association

  _mapJson: ->
    for name, value of @json
      @_setValue(name, value)

  _getValue: (name, value) ->
    if @_belongsToAssociations[name]?
      association = @_belongsToAssociations[name]
      model = new association()
      model.jsonObj(value)
      model
    else if @_hasManyAssociations[name]?
      models = []
      association = @_hasManyAssociations[name]
      for v in value
        model = new association()
        model.jsonObj(v)
        models.push model
      models
    else
      value

  _setValue: (name, value) ->
    @_attributes[name] = @_getValue(name, value)

    Object.defineProperty @, name,
      get: => @_attributes[name]
      set: (_value) => @_attributes[name] = _value

