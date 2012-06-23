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
        var self = this;
        this.model.set({ 'characterName': $('#characterName').val()},
            { error: function(model, error) {
                self.setError('characterName', error);
            }
        });
        this.model.set({ 'realm': $('#realm').val()},
            { error: function(model, error) {
                self.setError('realm', error);
            }
        });
    },

    setError: function(key, message) {
        $('#' + key ).addClass('error');
        $('#' + key ).data('error', message);
    }
});