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
been loaded ([see commit](de9247810ec74ab647f61258f955843651f99800)).

Next let's set up Backbone.js to bind to that fixture. It's a good idea to namespace your JS, so we'll introduce a
BackboneJasmine namespace for all of the code. This is now a global variable, so the gobal namespace checker will
complain, so we need to update the globalNameSpaceChecker.spec.js file to allow this variable.

Next we can go ahead and create our search view ([see commit](dc4ad52fb76a78a75324ce2b5440ee5ba84724c1)).

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
[commit](8f65bebc21aadc613cff3e37d7a83e917fa4e1f0)).

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
[commit](89e9e320c10f45c238dd574427840ca41ddb7f4e).

Time to hook the code into back into the View Model, let's start by taking the default values from the model and putting
 into the view. Here's the test code:

    it('should populate the form fields with values from the model', function() {
       expect($('#characterName').val()).toBe(this.view.model.get('characterName'));
       expect($('#realm').val()).toBe(this.view.model.get('realm'));
    });

The code to make this test pass can be found [here](eeebc6eb515eddb8e6f7aada4237819bfa2161c9)