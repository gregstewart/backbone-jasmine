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
	});

	it('should by default call the index route', function() {
		this.router.bind('route:index', this.routerSpy, this);
		this.router.navigate('', {trigger: true});
		
		expect(this.routerSpy).toHaveBeenCalledOnce();
		expect(this.routerSpy).toHaveBeenCalledWith();
	});

	it('should call the search route when #search is navigated to', function() {
		this.router.bind('route:search', this.routerSpy, this);
		this.router.navigate('search/1/2', {trigger: true});

		expect(this.routerSpy).toHaveBeenCalledOnce();
		expect(this.routerSpy).toHaveBeenCalledWith('1','2');
	});

});