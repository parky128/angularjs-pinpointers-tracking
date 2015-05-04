describe('Last Reported Event Directive Rendering', function () {

    beforeEach(module('ppMobi'));
    
    var compile, mockBackend, rootScope;

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
		rootScope = $rootScope;

    }));


	it('Should render HTML based on scope correctly', function(){

		var scope = rootScope.$new();
		//Doesn't matter what the values are here since this test is do with the HTML rendered from the directive  
		scope.eventData = {
			UntID: 12345,
			UnitName: 'Lightning McQueen',
			Location: 'M4, London, heading NE at 35mph.',
			EventDTDisplay: '18:15:05',
			InJourney: true,
			UrrID: 1

		};

		var element = compile('<last-reported-event event-data="eventData"></last-reported-event>')(scope);
		scope.$digest();

		//Test that the data was picked up correctly in the directive and matches the expected rendered HTML
		expect(element.html()).toEqual(
			'<h4 class="list-group-item-heading">'+
			'<span ng-class="getInJourneyClass(eventData)" class="journeyStatus vehicleInJourney"></span>' +
			'<span class="journeyStatus unitNameHeading ng-binding" ng-bind="eventData.UnitName">'+scope.eventData.UnitName+'</span></h4>' +
			'<p class="list-group-item-text ng-binding" ng-bind="eventData.Location">'+scope.eventData.Location+'</p>' +
			'<ul class="list-inline eventIconContainer">' +
			'<li>'+
			'<span ng-class="getReportReasonCls(eventData)" class="Icon16 Urr1"></span>' +
			'<span class="label label-default"><strong ng-bind="eventData.EventDTDisplay" class="ng-binding">'+scope.eventData.EventDTDisplay+'</strong></span>' +
			'</li>'+
			'</ul>'
		);
		//Test that the directive has the correct journey data on it's own scope
		var compiledElementScope = element.isolateScope();
		expect(compiledElementScope.eventData).toEqual(scope.eventData);

		expect(compiledElementScope.getInJourneyClass(compiledElementScope.eventData)).toEqual('journeyStatus vehicleInJourney');

        expect(compiledElementScope.getReportReasonCls(compiledElementScope.eventData)).toEqual('Icon16 Urr1');

	});

	

});