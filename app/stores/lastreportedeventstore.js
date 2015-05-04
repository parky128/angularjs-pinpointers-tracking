'use strict';

angular.module('ppMobi')
.factory('LastReportedEventStore',['helpersFactory','constants', function (helpersFactory, constants) {

    //Thinking that any stores of data to be shared across the application views, controllers, etc should live here...

    var lastReportedEvents = {},
        idProperty = 'UntID',
        dateFields = ['EventDT', 'EventDTUTC'];

    return {
        lastReportedEvents: lastReportedEvents,

        transformResponseData: function (data) {
            //Convert any encoded dates to true Date types - may be needed for sorting purposes in views
            var preparedData = helpersFactory.parseDatesFromResponse(data,dateFields);
            preparedData.forEach(function(lreData) {
                var lre = lastReportedEvents[lreData.UntID], demoName;
                //For demo purposes only - mask the true identity in view of proper unit names from back end
                demoName = constants.demoNames[lreData[idProperty]];
                if (angular.isString(demoName)) {
                    lreData.UnitName = demoName;
                }
                if (lre) {
                    lastReportedEvents[lreData.UntID] = angular.extend(lre, lreData);
                } else {
                    lastReportedEvents[lreData.UntID]=lreData;
                }
            });

        }
/*
        getByID: function (id) {
            for (var d = 0, len = lastReportedEvents.length; d < len; d += 1) {
                if (lastReportedEvents[d][idProperty] === id) {
                    return lastReportedEvents[d];
                }
            }
        }*/

    };

}]);