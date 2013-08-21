describe('Feed View', function () {
    beforeEach(function() {
      fixtureLoader('search-results.html');
    });

    it('should render a view item based on model values', function () {
        var feedModel = new BackboneJasmine.Feed({
                'itemId':'1',
                'timestamp':'1',
                'type': 'LOOT',
                'featOfStrength': 'Feat of Strength',
                'name': 'Name',
                'quantity': '1'
            }),
            view = new BackboneJasmine.FeedView({model:feedModel}),
            el = '';

        view.render();

        el = $(view.el).find('dl dd');

        expect($(el[0]).text()).toBe(view.model.get('itemId'));
        expect($(el[1]).text()).toBe(view.model.get('timestamp'));
        expect($(el[2]).text()).toBe(view.model.get('type'));
        expect($(el[3]).text()).toBe(view.model.get('featOfStrength'));
        expect($(el[4]).text()).toBe(view.model.get('name'));
        expect($(el[5]).text()).toBe(view.model.get('quantity'));
    });
});