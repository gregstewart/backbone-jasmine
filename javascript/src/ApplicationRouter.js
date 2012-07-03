var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.ApplicationRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'search/:realm/:character': 'search'
	},

	index: function() {
		this.searchView = new BackboneJasmine.SearchView();
	},

	search: function(realm, character) {
	}
});