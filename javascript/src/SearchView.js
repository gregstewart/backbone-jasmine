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
                self.showError('characterName');
            }
        });
        this.model.set({ 'realm': $('#realm').val()},
            { error: function(model, error) {
                self.setError('realm', error);
                self.showError('realm');
            }
        });
    },

    setError: function(key, message) {
        $('#' + key ).addClass('error');
        $('#' + key ).data('error', message);
    },

    showError: function(key) {
        $('#' + key).before('<div class="error-message">' + $('#' + key).data('error') + '</div>');
    }
});