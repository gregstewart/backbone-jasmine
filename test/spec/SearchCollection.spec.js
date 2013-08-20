describe('Search Collection', function() {

    beforeEach(function() {
        this.collection = new BackboneJasmine.SearchCollection();
        this.response = readFixtures('feed.json');
    });

    it('should initialise with an empty collection', function() {
        expect(this.collection.length).toBe(0);
    });

    describe('manually populate the collection', function() {
        it('should add 1 model to the collection', function() {
            var feed = new BackboneJasmine.Feed({type:'LOOT'});

            this.collection.add(feed);

            expect(this.collection.length).toBe(1);
            expect(this.collection.models[0].attributes['type']).toBe('LOOT');
        });
    });

    describe('fetch', function() {
        beforeEach(function() {
            this.server = sinon.fakeServer.create();
            this.server.respondWith('GET', '/search', [
                200,
                {"Content-Type": "application/json"},
                this.response
            ]);
        });

        afterEach(function() {
            this.server.restore();
            this.collection.reset();
        });

        it('should populate the collection', function() {

            this.collection.fetch();
            this.server.respond();

            expect(this.server.requests.length)
                .toEqual(1);
            expect(this.server.requests[0].method)
                .toEqual("GET");
            expect(this.server.requests[0].url)
                .toEqual("/search");

            expect(this.collection.length).toBe(JSON.parse(this.response)[0].feed.length);
        })
    });
});