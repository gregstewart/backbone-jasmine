describe('Search View Model', function() {
   beforeEach(function() {
       this.model = new BackboneJasmine.SearchModel();
   });

   it('should instantiate', function() {
    expect(this.model.get('characterName')).toBe('Artaios');
    expect(this.model.get('realm')).toBe('Aman\'thul');

   });
});