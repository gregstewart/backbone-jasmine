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

        });

        describe('validation fails', function() {
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

            it('should not save values if the validation fails', function() {
                expect(this.view.model.get('characterName')).toBe(this.originalName);
                expect(this.view.model.get('realm')).toBe(this.originalRealm);
            });

            it('should store error messages in the UI', function() {
                expect(this.view.setError).toHaveBeenCalled();
                expect($('#characterName')).toHaveClass('error');
                expect($('#characterName').data('error')).toBeDefined();
                expect($('#characterName').data('error')).toBe('empty character name supplied');
            });

            it('should display an error message', function() {
                expect(this.view.showError).toHaveBeenCalled();
                expect($('#characterName').prev()).toHaveClass('error-message');
                expect($('#characterName').prev().text()).toBe($('#characterName').data('error'));
            });
        });


    });
});