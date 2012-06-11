describe('search view', function() {
   beforeEach(function() {
       loadFixtures('search-form.html')
   });

   it('should load a fixture', function() {
      expect($('section.search-form')).toExist();
   });
});