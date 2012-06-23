describe('search view', function () {
    beforeEach(function () {
        loadFixtures('search-form.html');
        this.view = new BackboneJasmine.SearchView();
    });

    it('should load a fixture', function () {
        expect($('section.search-form')).toExist();
    });

    describe('instantiation', function () {

        it('should create search container', function () {
            expect(this.view.el.nodeName).toEqual('SECTION');
        });

        it('should populate the form fields with values from the model', function() {
           expect($('#characterName').val()).toBe(this.view.model.get('characterName'));
           expect($('#realm').val()).toBe(this.view.model.get('realm'));
        });
    });

    describe('saving values back to the model', function() {

        it('should save entered values back to our model', function() {
            var name = 'Some name',
                realm = 'Some realm';

            $('#characterName').val(name);
            $('#realm').val(realm);

            $('button').trigger('click');

            expect(this.view.model.get('characterName')).toBe(name);
            expect(this.view.model.get('realm')).toBe(realm);

        })

    })
});