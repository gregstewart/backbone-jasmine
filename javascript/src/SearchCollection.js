var BackboneJasmine = BackboneJasmine || {};

BackboneJasmine.SearchCollection = Backbone.Collection.extend({
    model: BackboneJasmine.Feed,
    url:'/search',

    parse:function (response) {
        return response[0].feed;
    }
});