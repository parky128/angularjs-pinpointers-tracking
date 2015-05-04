describe('Factory: helpersFactory', function () {

    beforeEach(module('ppMobi'));
    
    var fct;
    beforeEach(inject(function (_helpersFactory_) {
        fct = _helpersFactory_;
    }));

	describe('Testing of is24x24Icon logic:', function() {
		
		function test24x24IconDetection(iconNum) {
			it('Should detect iconNum '+iconNum+' is a 24 x 24 icon', function () {
				expect(fct.is24x24Icon(iconNum)).toBeTruthy();
			});
		}
		
		//Loop through possible values that should be detected as a 24 x 24 icon in the is24x24Icon helper function
		for(var x = 10090; x < 10126; x++) {
			test24x24IconDetection(x);
		}
		
	});

	describe('Testing of is3DIcon logic:', function() {

		function test3DIconDetection(iconNum) {
			it('Should detect iconNum '+iconNum+' is a 3D icon', function () {
				expect(fct.is3DIcon(iconNum)).toBeTruthy();
			});
		}

		//Loop through possible values that should be detected as a 24 x 24 icon in the is24x24Icon helper function
		for(var x = 30001; x < 30011; x++) {
			test3DIconDetection(x);
		}

	});
	
	

});