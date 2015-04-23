app.factory('DataStoreService', function ($rootScope, $location, $http, $timeout, LastReportedEventStore) {

    var getLastReportedEventsURL = '/location/GetLastReportedEvents.json?FieldSet=1&modifiedSince=0', firstDataRequest = true;

    //TO-DO: Need to think about adding a cachebuster _dc param like we do in ExtJS?

    return {

        //lastReportedEvents: lastReportedEvents,
        getLastReportedEvents: function () {
            $http.get(getLastReportedEventsURL)
                .success(function (data, status, headers, config) {

                    if (data.success) {

                        var result = angular.fromJson(data);
                        getLastReportedEventsURL = 'location' + result.nextURL;
                        LastReportedEventStore.transformResponseData(result.data);
                        if (firstDataRequest) {
                            $rootScope.$emit('drawunitmarkers');
                            firstDataRequest = false;
                        } else {
                            $rootScope.$emit('updateunitmarkers');
                        }

                        $rootScope.$emit('lastreportedeventsreceived');


                    }
                    else {
                        console.log('getLocationData ERROR!');
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log('getLocationData ERROR!');
                });

        }

    };

});