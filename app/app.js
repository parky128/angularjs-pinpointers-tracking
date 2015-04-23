//Purpose of the following code is to perform an session check before we bootstrap the application
//This will prevent any UI showing that a logged in user should not yet see, and gracefully redirect them to the login page
//In this particular session check, the server side checks for the presence of a session cookie and if present validates accordingly

angular.element(document).ready(function () {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    //This will return a promise on success or failure and provided user has a valid session (based on cookie check)
    //we can then take them to the app that is manually bootstrap our app.
    return $http.get("/session/GetSession.json").then(function (response) {
        if (response.data.success) {
            //session found so carry on with loading the main application
            angular.bootstrap(document, ["ppMobi"]);
        } else {
            //session not found, or has expried
            window.location = "/login.html";
        }
    }, function (errorResponse) {
        //something went wrong - error handling code should live here...
    });
});

var app = angular.module('ppMobi', [])
//Need to be able to look up the currently selected vehicle's untID from the database throughout the app.
//Could move this value declaration into a separate file if this becomes more verbose
.value('globals', {
    selectedUntID: null
})
.constant('constants', {
    imagesPath3dCarIcons: 'http://images.pinpointers.com/mapicons2/3DCarIcons41x37.png?v=2',
    imagesPathDefaultCarIcons: 'http://images.pinpointers.com/Sprites/all-trans-v-1-5-0.png',
    demoNames: {
        '9225': 'James Timberland P[J08 LDS',
        '3555': 'James Anderson YT12 OSV',
        '10771': 'Tim Stamp TH8 KJL',
        '8983': 'Fred Dance RF12 IBD',
        '10767': 'Colin Frances GH13 LKW',
        '10722': 'Ken Barton FD11 WSD',
        '10774': 'Terry Jenkins CX12 IKL',
        '10770': 'Steve Collins AZ11 UDH',
        '10754': 'Charles Dean WE12 KDH',
        '10769': 'Phil Bawden IU14 TRF',
        '10773': 'Barry Shaw BN14 WEP',
        '10766': 'Kim Stanton WV23 TGV',
        '10755': 'Kenny White CV14 UTV',
        '10737': 'Carl Freeman DF12 MDB'
    }
})
.controller('mainCtrl', function ($scope, $http) {
    $scope.loggedIn = true;

    $scope.logout = function () {
        $http.post('/session/EndSession.json')
			    .success(function (data) {
			        if (data.success) {

			            console.log('Logout successful, redirect to main application');
			            //Redirect back to application root for routeProvider to kick in on main app code
			            window.location = "/login.html";
			        } else {
			            //Handling with suitable error message to be shown
			        }
			    })
			    .error(function (data) {
			        //Handling with suitable error message to be shown

			    });
    };
})
.run(['DataStoreService', '$timeout', '$rootScope', function (DataStoreService, $timeout, $rootScope) {
    $rootScope.$on('lastreportedeventsreceived', function (event) {
        $timeout(function () {
            DataStoreService.getLastReportedEvents();
        }, 5000);
    });
}]);

