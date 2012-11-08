var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.FeedView = Backbone.View.extend({

    tagName: 'li',
    className: 'feed',
    model: BackboneJasmine.Feed,

    render: function() {
        var variables = {
            itemId: this.model.get('itemId'),
            timestamp: this.model.get('timestamp'),
            type: this.model.get('type'),
            featOfStrength: this.model.get('featOfStrength'),
            name: this.model.get('name'),
            quantity: this.model.get('quantity')
        };

        var template = _.template($('#result-item').html(), variables);
        this.$el.html(template);

        return this;
    }

});