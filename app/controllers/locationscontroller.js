app.controller('LocationsController', ['$rootScope', '$scope', 'LastReportedEventStore', 'globals', function ($rootScope, $scope, LastReportedEventStore, globals) {

    var self = this;
    self.locations = LastReportedEventStore.lastReportedEvents;
    self.selectedIndex = null;


    self.showOnMap = function (untID) {
        alert('showOnMap: ' + untID);
    };

    self.showHistory = function (untID) {
        alert('showHistory: ' + untID);
    };

    self.handleItemClick = function (index, untID, lat, lon) {
        //Set our 'global' selectedUntID value here as it will be required elsewhere
        globals.selectedUntID = untID;
        $rootScope.$emit('zoomtolatlon', { pos: new google.maps.LatLng(lat, lon) });
    };

    self.isSelected = function (untID) {
        return untID === globals.selectedUntID;
    }

} ]);