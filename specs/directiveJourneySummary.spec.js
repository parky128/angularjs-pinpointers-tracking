describe('Journey Summary Directive Rendering', function () {

    beforeEach(module('ppMobi'));
    
    var compile, mockBackend, rootScope;

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
		rootScope = $rootScope;

    }));


	it('Should render HTML based on scope correctly', function(){

		var scope = rootScope.$new();
		//Doesn't matter what the values are here since this test is do with the HTML rendered from the directive
		scope.journeyData = {
			HujID: 12345,
			Description: 'Journey Description Text'
		};

		var element = compile('<journey-summary journey-data="journeyData"></journey-summary>')(scope);
		scope.$digest();

		//Test that the data was picked up correctly in the directive and matches the expected rendered HTML
		expect(element.html()).toEqual(
			'<p id="huj'+scope.journeyData.HujID+'" class="list-group-item-text journey-summary-text ng-binding">'+scope.journeyData.Description+'</p>'
		);
		//Test that the directive has the correct journey data on it's own scope
		var compiledElementScope = element.isolateScope();
		expect(compiledElementScope.journeyData).toEqual(scope.journeyData);

	});

	

});