describe('Application routes', function() {
	beforeEach(function() {
		this.router = new BackboneJasmine.ApplicationRouter();
		this.searchViewStub = sinon.stub(BackboneJasmine, 'SearchView').returns(new Backbone.View());
		this.routerSpy = sinon.spy();

		try {
			Backbone.history.start({silent: true, pushState: true});
		} catch(e) {
		}

		this.router.navigate('/javascript/spec/SpecRunner.html');
	});

	afterEach(function() {
		this.searchViewStub.restore();
		this.router.navigate('/javascript/spec/SpecRunner.html');
		Backbone.history.stop();
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

	describe('index', function() {
		beforeEach(function() {
			this.router.index();
		});

		it('should created the search view', function() {
			expect(this.searchViewStub).toHaveBeenCalledOnce();
		});
	});

});