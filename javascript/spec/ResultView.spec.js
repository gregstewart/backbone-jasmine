describe('Result View', function() {
    beforeEach(function() {

        loadFixtures('search-results.html');
        this.response = readFixtures('feed.json');

        this.view = new BackboneJasmine.ResultView();
        this.view.collection.add(JSON.parse(this.response).feed);
        this.view.render();
    });

    it('should load a fixture', function () {
        expect($('section.search-results')).toExist();
    });

    it('should display a result data', function() {

        var els = $('.search-results > ul li');
        expect($('.search-results')).not.toBeHidden();
        expect(els.length).not.toBe(0);
        expect(els.find('dl > dd').first().text()).toBe('77022');
    });
});

