describe('search view model', function () {
    beforeEach(function () {
        this.characterName = 'Artaios';
        this.realm = 'Aman\'thul';
        this.model = new BackboneJasmine.SearchModel({ characterName: this.characterName, realm: this.realm });
    });

    it('should instantiate', function () {
        expect(this.model.get('characterName')).toBe(this.characterName);
        expect(this.model.get('realm')).toBe(this.realm);
    });

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
});