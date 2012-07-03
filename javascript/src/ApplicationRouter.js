var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.ApplicationRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'search/:realm/:character': 'search'
	},

	index: function() {

	},

	search: function(realm, character) {
	}
});