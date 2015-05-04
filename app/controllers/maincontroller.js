'use strict';

angular.module('ppMobi')
.controller('MainController', ['$scope', '$http', function ($scope, $http) {

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

} ]);