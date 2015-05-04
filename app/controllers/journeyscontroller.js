'use strict';

angular.module('ppMobi')
.controller('JourneysController', ['$rootScope', '$scope', '$location', '$filter', 'LastReportedEventStore', 'DataStoreService', 'JourneyStore', 'globals', function ($rootScope, $scope, $location, $filter, LastReportedEventStore, DataStoreService, JourneyStore, globals) {

    var self = this;
    self.currentlocation = LastReportedEventStore.lastReportedEvents[globals.selectedUntID];

    //This is probably overkill...


    self.journeys = JourneyStore.journeys;

    self.getHistory = function () {
        //JourneyStore.clearJourneyStore();
        //Hard coded test for current date, should be using a date picker component value from UI
        DataStoreService.getJourneys({untID: globals.selectedUntID, day: $filter('date')(new Date(), "yyyy-MM-dd")});
    };


    self.handleItemClick = function () {
        return;
    };

    self.goBackToCurrentLocations = function () {
        globals.selectedUntID = null;
        $rootScope.$emit('resetmap');
        $location.path('/');
    }


} ]);