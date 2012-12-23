#backbone-jasmine#

More for my own sanity than anything else, I'll be building up a simple interface, that will query an API
and display the results in a view. The process will involve writing a test in Jasmine and then writing some
code to make it pass.

The idea is that there will be a:

* Search View
* Search Model
* A List View
* A List collection
* A Result/List Item that will form part of the List Collection
* Some routes to bind the two views together

##Set-up##

To get started everything is in the setup branch. I have also included a simple node https server to serve
up the the SpecRunner file (running on http://localhost:3000), a few helper libraries (jasmine-jquery and jasmine-sinon) with additional matchers.

##Search form##

Basically I intend to hit the blizzard API to retrieve the feed of a given character on a given realm. To start
off let's create a search view and get started with a really basic test to load a fixture and make sure it's been
been loaded ([see commit](backbone-jasmine/commit/de9247810ec74ab647f61258f955843651f99800)).

Next let's set up Backbone.js to bind to that fixture. It's a good idea to namespace your JS, so we'll introduce a
BackboneJasmine namespace for all of the code. This is now a global variable, so the gobal namespace checker will
complain, so we need to update the globalNameSpaceChecker.spec.js file to allow this variable.

Next we can go ahead and create our search view ([see commit](backbone-jasmine/commit/dc4ad52fb76a78a75324ce2b5440ee5ba84724c1)).

    beforeEach(function () {
        loadFixtures('search-form.html')
        this.view = new BackboneJasmine.SearchView();
    });

    it('should load a fixture', function () {
        expect($('section.search-form')).toExist();
    });

    describe('instantiation', function () {

        it('should create search container', function () {
            expect(this.view.el.nodeName).toEqual('SECTION');
        });
    });

Right now there's a blank container, time to add some form fields. It would be nice to bind these fields to a
model and set some default values. Furthermore at a later stage the model will be used to validate the field values.
Let's put some tests around creating a Search View Model, instantiating it with some default values.  Here's the test
code:

    beforeEach(function() {
       this.model = new BackboneJasmine.SearchModel();
    });

    it('should instantiate', function() {
        expect(this.model.get('characterName')).toBe('Artaios');
        expect(this.model.get('realm')).toBe('Aman\'thul');
    });

Time to build up the SearchModel and make sure it instantiates with sensible defaults (see SearchModel.js for
[commit](backbone-jasmine/commit/8f65bebc21aadc613cff3e37d7a83e917fa4e1f0)).

Backbone has a validate() method, that gets called whenever an attribute is set or the model is saved. This
in turn triggers an error event when things aren't quite right. So let's try and put it to use and write
some tests around not being able to set an empty character and realm.

    describe('validation', function () {

        beforeEach(function () {
            this.errorEventSpy = sinon.spy();
            this.model.bind('error', this.errorEventSpy);

            this.changeEventSpy = sinon.spy();
            this.model.bind('change', this.changeEventSpy);
        });

        it('should not allow an empty character name', function() {
            this.model.set({characterName: ''});

            expect(this.changeEventSpy).not.toHaveBeenCalled();
            expect(this.errorEventSpy).toHaveBeenCalled();
            expect(this.model.get('characterName')).toBe(this.characterName);
        });

        it('should not allow an empty realm name', function() {
            this.model.set({realm: ''});

            expect(this.changeEventSpy).not.toHaveBeenCalled();
            expect(this.errorEventSpy).toHaveBeenCalled();
            expect(this.model.get('realm')).toBe(this.realm);
        });
    });

I am using [sinon](http://sinonjs.org/) for spying in these examples and I have also pulled in a bunch of
[custom matchers](https://github.com/froots/jasmine-sinon). The code to help the tests pass can found @
[commit](backbone-jasmine/commit/89e9e320c10f45c238dd574427840ca41ddb7f4e).

Time to hook the code into back into the View Model, let's start by taking the default values from the model and putting
 into the view. Here's the test code:

    it('should populate the form fields with values from the model', function() {
       expect($('#characterName').val()).toBe(this.view.model.get('characterName'));
       expect($('#realm').val()).toBe(this.view.model.get('realm'));
    });

The code to make this test pass can be found [here](backbone-jasmine/commit/eeebc6eb515eddb8e6f7aada4237819bfa2161c9)

With some basic validation in place, it's time to return to the view and write some tests around saving values set in the
 view back to the model and also make sure the validation is triggered.

    describe('saving values back to the model', function() {

        it('should save entered values back to our model', function() {
            var name = 'Some name',
                realm = 'Some realm';

            $('#characterName').val(name);
            $('#realm').val(realm);

            $('button').trigger('click');

            expect(this.view.model.get('characterName')).toBe(name);
            expect(this.view.model.get('realm')).toBe(realm);
        });

    });

Now write some code to make the test pass, by first binding an event to a click action which calls a method to set
the values in the model [here](backbone-jasmine/commit/11b26e0). Likewise we can now test that the we cannot store empty values:

    describe('validation fails', function() {
        it('should not save values if the validation fails', function() {
            var originalName = this.view.model.get('characterName'),
                originalRealm = this.view.model.get('realm');

            $('#characterName').val('');
            $('#realm').val('');

            $('button').trigger('click');

            expect(this.view.model.get('characterName')).toBe(originalName);
            expect(this.view.model.get('realm')).toBe(originalRealm);

        });
    });

Making use of the error event that has been raised by the model, let's see if we can't push something into the view to
help fix those errors. Let start by testing for an error class and a data-error attribute. The test has been re-worked
a little:

    describe('validation fails', function() {
        beforeEach(function() {
            this.originalName = this.view.model.get('characterName'),
            this.originalRealm = this.view.model.get('realm');

            $('#characterName').val('');
            $('#realm').val('');

            $('button').trigger('click');
        });

        .....

        it('should show error messages in the UI', function() {
            expect($('#characterName')).toHaveClass('error');
            expect($('#characterName').data('error')).toBeDefined();
            expect($('#characterName').data('error')).toBe('empty character name supplied');
        });
    });

The code to make this test pass can be found [here](b96aedc). Let's expand this test a little and play with spies
and test that the setError method was actually called. I am doing this because it's a concept I am wrestling with. Short
of [monkey patching](http://stackoverflow.com/questions/10865364/qunit-sinon-js-backbone-unit-test-frustration-sinon-spy-appears-to-fail-to-d),
I have not been able to set up spies on events that are bound when the view initialises. However, you can set a spy on
a method gets called as part of the event execution (such as the setError method in this case). So the test is updated as follows:

    beforeEach(function() {
        var spy = sinon.spy(this.view, 'setError');
        this.originalName = this.view.model.get('characterName'),
        this.originalRealm = this.view.model.get('realm');

        $('#characterName').val('');
        $('#realm').val('');

        $('button').trigger('click');
    });

    afterEach(function() {
        this.view.setError.restore();
    });

    ...

    it('should show error messages in the UI', function() {
        expect(this.view.setError).toHaveBeenCalled();
        expect($('#characterName')).toHaveClass('error');
        expect($('#characterName').data('error')).toBeDefined();
        expect($('#characterName').data('error')).toBe('empty character name supplied');
    });

I already new the code was being called, but I feel happier now that I can assert that the method is being called and
not just the outcome. Let's extend this and actually render an error message.

    beforeEach(function() {
        var spy = sinon.spy(this.view, 'setError'),
            spyShowError = sinon.spy(this.view, 'showError');
        this.originalName = this.view.model.get('characterName');
        this.originalRealm = this.view.model.get('realm');

        $('#characterName').val('');
        $('#realm').val('');

        $('button').trigger('click');
    });

    afterEach(function() {
        this.view.setError.restore();
        this.view.showError.restore();
    });

    ...

    it('should display an error message', function() {
        expect(this.view.showError).toHaveBeenCalled();
        expect($('#characterName').prev()).toHaveClass('error-message');
        expect($('#characterName').prev().text()).toBe($('#characterName').data('error'));
    });

Time to add a ['showError'](7e8e0c1) method that will prepend a div to the element in question and insert the text stored in the
element's data-error attribute. And this for now at least concludes the search view part.

##Routes##

Before dealing with the submission and fetching results, a quick detour into routes where the application is glued together.
What follows are some tests to make sure the routes defined are being triggered when we navigate to the url, starting with the index action:

    describe('Application routes', function() {
        beforeEach(function() {
            this.router = new BackboneJasmine.ApplicationRouter();
            this.routerSpy = sinon.spy();

            try {
                Backbone.history.start({silent: true, pushState: true});
            } catch(e) {
            }

            this.router.navigate('/javascript/spec/SpecRunner.html');
        });

        afterEach(function() {
            this.router.navigate('/javascript/spec/SpecRunner.html');
            Backbone.history.stop();
        });

        it('should by default call the index route', function() {
            this.router.bind('route:index', this.routerSpy, this);
            this.router.navigate('', {trigger: true});
            
            expect(this.routerSpy).toHaveBeenCalledOnce();
            expect(this.routerSpy).toHaveBeenCalledWith();
        });

    });

And here's the ApplicationRouter file to make the test pass:

    var BackboneJasmine = BackboneJasmine || {};

    BackboneJasmine.ApplicationRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
        },

        index: function() {

        }
    });

A search route is also needed, test first:

    it('should call the search route when #search is navigated to', function() {
        this.router.bind('route:search', this.routerSpy, this);
        this.router.navigate('search/1/2', {trigger: true});

        expect(this.routerSpy).toHaveBeenCalledOnce();
        expect(this.routerSpy).toHaveBeenCalledWith('1','2');
    });

And the code to make it pass:

    routes: {
        '': 'index',
        'search/:realm/:character': 'search'
    },

    ...

    search: function(realm, character) {
    }

Now that the scaffold for the application is done, it's time to flesh it out starting with the index route and making it
initialise the search interface (SearchView). Start off with editing our initial beforeEach() and afterEach()

    beforeEach(function() {
        this.router = new BackboneJasmine.ApplicationRouter();
        this.searchViewStub = sinon.stub(BackboneJasmine, 'SearchView').returns(new Backbone.View());
        
        ...
    });

    afterEach(function() {
        this.searchViewStub.restore();
        ...
    });

Now for the actual test:

    describe('index', function() {
        beforeEach(function() {
            this.router.index();
        });

        it('should created the search view', function() {
            expect(this.searchViewStub).toHaveBeenCalledOnce();
        });
    });

A stub was created for our SearchView and we are now watching this and want to make sure it gets called when we call the
index function. To make the test pass simply instantiate the SearchView in the ApplicationRouter.js file:

    index: function() {
        this.searchView = new BackboneJasmine.SearchView();
    },

That's it for now with regards to the routes, I'll coming back to these once the search component has been completed.

##Demo##

In the root of the code there's a little demo index.html file that you can browse to if you are using the 'node app.js'
server, just go to: [http://localhost:3000/index.html](http://localhost:3000/index.html).

##Search Results##

In the following we will leverage Backbone Collections and the fetch feature in order to make a call to the service,
receive some JSON and build up an array of models from that response. Let's start with creating the collection tests:

    describe('Search Collection', function() {

        beforeEach(function() {
            this.collection = new BackboneJasmine.SearchCollection();
        });

        it('should initialise with an empty collection', function() {
            expect(this.collection.length).toBe(0);
        });
    });

Next populating the collection with some dummy data:

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

            expect(this.collection.length).toBe(JSON.parse(this.response).feed.length);
        })
    });

Since the API is for a character's feed, let's call our model Feed. The call to fetch() will go away get the JSON and
magically take the data and create one feed model for each feed entry returned and store it in the collection. However
because the response is wrapped within a feed object, the collection object also has a parse method to handle the
response and let Backbone to work the magic described previously.

    var BackboneJasmine = BackboneJasmine || {};

    BackboneJasmine.SearchCollection = Backbone.Collection.extend({
        model: BackboneJasmine.Feed,
        url:'search',

        parse:function (response) {
            return response.feed;
        }
    });

All the code is in the ['Search Results branch'](backbone-jasmine/commit/cfe636e).

##Display Results##

Time to display the response back to the user, to this end we'll leverage Underscore.js built-in templating language. Our template to represent the Feed model will end up looking something like this:

    <dl>
        <dt>itemId</dt>
        <dd><%= itemId %></dd>
        <dt>timestamp</dt>
        <dd><%= timestamp %></dd>
        <dt>type</dt>
        <dd><%= type %></dd>
        <dt>featOfStrength</dt>
        <dd><%= featOfStrength %></dd>
        <dt>name</dt>
        <dd><%= name %></dd>
        <dt>quantity</dt>
        <dd><%= quantity %></dd>
    </dl>

We'll use a FeedView to populate the template, so given what we know about the FeedModel and the JS template, let's go ahead and write some tests to populate the template from the model.

    describe('Feed View', function () {
        beforeEach(function() {
            loadFixtures('search-results.html');
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

To get the tests to pass we need to first create a FeedView object and it will look as follows:

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
        }

    });

The next step involves building out the result view, which will be bound to our collection and display multiple FeedViews. Let's start by fleshing out the test a little to get us started

    describe('Result View', function() {
        beforeEach(function() {

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


We can get the first test to pass easily by creating our fixture and adding it to the spec, but we'll also need to start start pulling our result view, which will be populated with our response fixture:

    beforeEach(function() {
        loadFixtures('search-results.html');
        this.response = readFixtures('feed.json');

        this.view = new BackboneJasmine.ResultView();
        this.view.collection.add(JSON.parse(this.response).feed);
        this.view.render();
    });

With this in place, we can build out the ResultView object.

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

['This is an idealistic view'](backbone-jasmine/commit/7581346) of syncing data between your services and your UI. Next up I'll look at customising the collection fetch method and later on extend this to make a JSONP call.
