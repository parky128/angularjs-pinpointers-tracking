'use strict';

angular.module('ppMobi')
.controller('LocationsController', ['$rootScope', '$scope', '$location', 'LastReportedEventStore', 'globals', 'JourneyStore' ,
    function ($rootScope, $scope, $location, LastReportedEventStore, globals, JourneyStore) {

    var self = this;
    self.locations = LastReportedEventStore.lastReportedEvents;
    //self.selectedIndex = null;
    globals.selectedUntID = null;

    self.handleItemClick = function (index, untID, lat, lon) {
        //Set our 'global' selectedUntID value here as it will be required elsewhere
        globals.selectedUntID = untID;
        $rootScope.$emit('zoomtolatlon', { lat: lat, lon: lon });
        $location.path('/journeys');
        JourneyStore.clearJourneyStore();
    };

    self.isSelected = function (untID) {
        return untID === globals.selectedUntID;
    }

} ]);