var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.SearchModel = Backbone.Model.extend({
    defaults: {
        characterName: 'wibble',
        realm: 'wobble'
    },

    validate: function(attrs) {
        if (attrs.characterName === '') {
            return 'empty character name supplied'
        }

        if (attrs.realm === '') {
            return 'empty realm supplied'
        }
    }
});