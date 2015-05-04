describe('Locations Controller', function () {

	var ctrl, scope, rootScope;
	beforeEach(module('ppMobi'));
	beforeEach(function() {
		//module('ppMobi')
		inject(function ($rootScope, $controller) {
			rootScope = $rootScope;
			scope = $rootScope.$new();
			spyOn(rootScope, "$emit").and.callThrough();
			ctrl = $controller('LocationsController', {$scope: scope});
		});
	});

	it('Should emit an event on selection of an item', function () {

		rootScope.$emit('zoomtolatlon', [{ lat: 50.234, lon: -1.23456 }]);
		expect(rootScope.$emit).toHaveBeenCalledWith('zoomtolatlon',[{ lat: 50.234, lon: -1.23456 }]);
		//expect(ctrl.selectedIndex).toBeNull();
		//self.selectedIndex = null;

	});


});