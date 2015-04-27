app.controller('MapController', ['$scope', '$rootScope', '$compile','LastReportedEventStore', 'GMapsInitializer', 'DataStoreService', 'globals', 'helpersFactory', function ($scope, $rootScope, $compile, LastReportedEventStore, GMapsInitializer, DataStoreService, globals, helpersFactory) {

    self = this;
    self.map = null;
    self.untMarkers = {};
    self.lastUntMarker = null;
        
   

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
                untID: untID,
                infoWindow: null,
                infoWindowIsOpen: false

            };

            var unitMarker = new google.maps.Marker(markerOptions);
            google.maps.event.addListener(unitMarker, 'click', angular.bind(self, self.showMarkerInfoWindow, unitMarker));

            self.untMarkers['u' + data.UntID] = unitMarker;
        }
    };

    self.updateUnitMarker = function (data) {
        var marker = self.untMarkers['u' + data.UntID];
        marker.setPosition(new google.maps.LatLng(data.Lat, data.Lon));
        if (marker.infoWindow !== null) {
            if (marker.infoWindowIsOpen === true) {
                marker.infoWindow.close();
                marker.infoWindow.setContent(self.untInfoWindowContent(marker.untID));
                marker.infoWindow.open(self.map, marker);
            } else {
                marker.infoWindow.setContent(self.untInfoWindowContent(marker.untID));
            }
        }
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

    self.showMarkerInfoWindow = function (marker) {
        if (angular.isObject(this.lastUntMarker) && this.lastUntMarker.untID !== marker.untID) {
            self.hideMarkerInfoWindow(this.lastUntMarker);
        }
        if (!marker.infoWindowIsOpen) {
            //r = this.getLastReportedEventStore().findRecord('UntID', marker.untID);
            //if (!Ext.isEmpty(r)) {
                if (marker.infoWindow === null) {

                    iw = new google.maps.InfoWindow({
                        maxWidth: 300,
                        disableAutoPan: true,
                        content: self.untInfoWindowContent(marker.untID)

                    });
                    google.maps.event.addListener(iw, 'closeclick', angular.bind(self, self.markerInfoWindowClose, marker));
                    marker.infoWindow = iw;
                }
            //}
            marker.infoWindow.open(self.map, marker);
            marker.infoWindowIsOpen = true;
            this.lastUntMarker = marker;
        }
    };

    self.untInfoWindowContent = function(untID) {
        //Idea here is to use the passed in id and retrieve a dom element with the ID used as a css name - not pretty!
        //var el = $(".unt"+untID).contents();

        var el = $('#unt' + untID);
        return '<div>' + el[0].innerHTML + '</div>';
        //return '<div>' + el[0].innerHTML + '</div>';
        //console.log(LastReportedEventStore.getIndexOfID(untID));
    };

    self.markerInfoWindowClose = function(marker) {
        marker.infoWindowIsOpen = false;
    };

    self.hideMarkerInfoWindow = function(marker) {
        if (angular.isObject(marker) && angular.isObject(marker.infoWindow)) {
            marker.infoWindow.close();
            marker.infoWindowIsOpen = false;

        }
    };

} ]);