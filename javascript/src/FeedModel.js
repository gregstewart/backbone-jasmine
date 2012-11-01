var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.Feed = Backbone.Model.extend({
    defaults: {
        itemId: ''
        , timestamp: ''
        , type: ''
        , featOfStrength: ''
        , name: ''
        , quantity: ''
    }
});