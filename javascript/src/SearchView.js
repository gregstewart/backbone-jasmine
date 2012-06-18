var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.SearchView = Backbone.View.extend({
    tagName: 'section',
    className: 'search-view',

    initialize: function() {
        this.model = new BackboneJasmine.SearchModel();

        this.render();
    },

    render: function() {
        $('#characterName').val(this.model.get('characterName'));
        $('#realm').val(this.model.get('realm'));
    }

});