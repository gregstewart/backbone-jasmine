var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.ResultView = Backbone.View.extend({
    el: 'section.search-results',

    initialize: function() {
        _.bindAll(this, 'addFeed');

        this.collection = new BackboneJasmine.SearchCollection();
        this.$el.hide();
        this.render();
    },

    render: function() {
        this.$el.show();
        this.collection.each(this.addFeed);
    },

    addFeed: function(feed) {
        var view = new BackboneJasmine.FeedView({model: feed}),
            feedItem = view.render().el;
        this.$el.find('ul').append(feedItem);
    }

});