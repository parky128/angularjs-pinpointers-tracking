app.factory('helpersFactory', ['constants', function (constants) {

    return {

        
        //This is purely for demo video purposes and is used to hide the real identities of vehicle names
        //from the Pinpointers database in the rendered HTML.
        replaceDemoNames: function (data) {
            angular.forEach(data, function (value, key, data) {
                if (angular.isString(constants.demoNames[data[key].UntID])) {
                    data[key].UnitName = constants.demoNames[data[key].UntID];
                }
            });
            return data;
        },

        getVehicleMarkerIcon: function (iconNum, heading) {

            if (this.is3DIcon(iconNum)) {
                return { url: constants.imagesPath3dCarIcons, size: new google.maps.Size(41, 37), origin: new google.maps.Point(1476 * (iconNum - 30001) + (41 * (Math.round((heading - 5) / 10) % 36)), 0), anchor: new google.maps.Point(20, 18) };
            }
            if (this.is24x24Icon(iconNum)) {
                return { url: constants.imagesPathDefaultCarIcons, size: new google.maps.Size(24, 24), origin: new google.maps.Point(24 * (iconNum - 10090), 48), anchor: new google.maps.Point(12, 12) };
            }
            if (this.isSmartPhoneIcon(iconNum)) {
                return { url: constants.imagesPathDefaultCarIcons, size: new google.maps.Size(18, 28), origin: new google.maps.Point(18 * (iconNum - 14000), 114), anchor: new google.maps.Point(6, 20) };
            }
            if (this.isOtherPhoneIcon(iconNum)) {
                return { url: constants.imagesPathDefaultCarIcons, size: new google.maps.Size(15, 30), origin: new google.maps.Point(15 * (iconNum - 13000), 76), anchor: new google.maps.Point(6, 20) };
            } else {
                if (iconNum >= 11001 && iconNum <= 11004) {
                    return { url: constants.imagesPathDefaultCarIcons, size: new google.maps.Size(16, 16), origin: new google.maps.Point(16 * (iconNum - 10912), 24), anchor: new google.maps.Point(8, 8) };
                } else {
                    return { url: constants.imagesPathDefaultCarIcons, size: new google.maps.Size(16, 16), origin: new google.maps.Point(16 * (iconNum - 10001), 24), anchor: new google.maps.Point(8, 8) };
                }
            }

            //default return nothing - will mean a default google maps marker icon will be used instead
            return;
        },

        is24x24Icon: function (iconNum) {
            return ((iconNum >= 10090 && iconNum <= 10125) || (iconNum >= 20007 && iconNum <= 20028) || (iconNum >= 50000 && iconNum <= 50035) || iconNum == 110 || iconNum == 210 || iconNum == 220 || iconNum == 1090 || iconNum == 1100); a
        },

        is3DIcon: function (iconNum) {
            return (iconNum >= 30001 && iconNum <= 30010);
        },

        isSmartPhoneIcon: function (iconNum) {
            return ((iconNum >= 14000 && iconNum <= 14008));
        },

        isOtherPhoneIcon: function (iconNum) {
            return ((iconNum >= 13000 && iconNum <= 13008));
        }

    };

}]);