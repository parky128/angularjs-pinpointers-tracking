app.controller('MapController', ['$scope', '$rootScope', 'LastReportedEventStore', 'GMapsInitializer', 'DataStoreService', 'globals', 'helpersFactory', function ($scope, $rootScope, LastReportedEventStore, GMapsInitializer, DataStoreService, globals, helpersFactory) {

    var self = this;
    self.map = null;
    self.untMarkers = {};

    GMapsInitializer.mapsInitialized.then(function (a, b, c) {

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        };
        self.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        DataStoreService.getLastReportedEvents();
    });

    $rootScope.$on('drawunitmarkers', function (event, args) {
        self.drawUnitMarkers();
    });

    $rootScope.$on('updateunitmarkers', function (event, args) {
        self.updateUnitMarkers();
    });

    $rootScope.$on('zoomtolatlon', function (event, args) {
        self.zoomToLatLon(args.pos);
    });

    self.drawUnitMarkers = function () {

        angular.forEach(LastReportedEventStore.lastReportedEvents, function (data, key) {
            self.drawUnitMarker(data);
        });
        self.resetMap();
    };

    self.updateUnitMarkers = function () {
        angular.forEach(LastReportedEventStore.lastReportedEvents, function (data, key) {
            self.updateUnitMarker(data);
        });
        
        self.resetMap();
    };

    self.drawUnitMarker = function (data) {
        if (data.Lat != null && data.Lon != null && (!(data.Lat == 0 && data.Lon == 0))) {
            var untID = data.UntID;
            var markerImage = helpersFactory.getVehicleMarkerIcon(data.MapIcon, data.Heading);
            var pos = new google.maps.LatLng(data.Lat, data.Lon)
            var markerOptions = {
                position: pos,
                map: self.map,
                visible: true,
                icon: markerImage,
                zIndex: 300,
                uid: 'unt' + untID,
                untID: untID

            };

            var unitMarker = new google.maps.Marker(markerOptions);
            self.untMarkers['u' + data.UntID] = unitMarker;

        }
    };

    self.updateUnitMarker = function (data) {
        var m = self.untMarkers['u' + data.UntID];
        m.setPosition(new google.maps.LatLng(data.Lat, data.Lon));
    };

    self.resetMap = function () {

        //If we have already selected a vehicle to view on the map, we should 'follow' it and therefore recenter the map
        //to it's most recently reported position.
        if (angular.isNumber(globals.selectedUntID)) {
            var pos = self.untMarkers['u' + globals.selectedUntID].getPosition();
            self.zoomToLatLon(pos);
        } else {
            //No vehicle selection made so should reset the map to show all vehciles
            var bounds = new google.maps.LatLngBounds();
            angular.forEach(self.untMarkers, function (marker, untID) {
                bounds.extend(marker.getPosition());
            });
            self.map.fitBounds(bounds);
            self.map.setCenter(bounds.getCenter());
        }
    };

    self.zoomToLatLon = function (pos) {
        self.map.setCenter(pos);
        self.map.setZoom(16);
    };

    //This is just a helper, so could live in a service perhaps?
    //self.getUnitMarkerIcon = function (iconNum, heading) {

        

    //};

    //self.is24x24Icon = function (iconNum) {
    //    return ((iconNum >= 10090 && iconNum <= 10125) || (iconNum >= 20007 && iconNum <= 20028) || (iconNum >= 50000 && iconNum <= 50035) || iconNum == 110 || iconNum == 210 || iconNum == 220 || iconNum == 1090 || iconNum == 1100); a
    //};

    //self.is3DIcon = function (iconNum) {
    //    return (iconNum >= 30001 && iconNum <= 30010);
    //};

    //self.isSmartPhoneIcon = function (iconNum) {
    //    return ((iconNum >= 14000 && iconNum <= 14008));
    //};

    //self.isOtherPhoneIcon = function (iconNum) {
    //    return ((iconNum >= 13000 && iconNum <= 13008));
    //};






} ]);