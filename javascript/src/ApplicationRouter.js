var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.ApplicationRouter = Backbone.Router.extend({
	routes: {
		'': 'index'
        , 'search/:realm/:character': 'search'
	},

	initialize: function() {
		Backbone.history.start();
    },

	index: function() {
        this.searchView = new BackboneJasmine.SearchView();
    },

	search: function(realm, character) {
        this.resultView = new BackboneJasmine.ResultView();
    }
});