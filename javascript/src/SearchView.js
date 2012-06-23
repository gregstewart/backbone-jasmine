var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.SearchView = Backbone.View.extend({
    el: 'section.search-form',

    events: {
        'click button': 'setValues'
    },

    initialize: function() {
        this.model = new BackboneJasmine.SearchModel();
        this.render();
    },

    render: function() {
        $('#characterName').val(this.model.get('characterName'));
        $('#realm').val(this.model.get('realm'));
    },

    setValues: function() {
        this.model.set({'characterName': $('#characterName').val(),
                        'realm': $('#realm').val()});
    }


});