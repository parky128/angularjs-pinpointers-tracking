﻿'use strict';

angular.module('ppMobi')
.factory('GMapsInitializer', function ($window, $q) {

    //Google's url for async maps initialization accepting callback function
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?v=3.16&client=gme-sbssolutionsltd&sensor=false&callback=',
        mapsDefer = $q.defer();

    //Callback function - resolving promise after maps successfully loaded
    $window.googleMapsInitialized = mapsDefer.resolve;

    //Async loader
    var asyncLoad = function (asyncUrl, callbackName) {
        var script = document.createElement('script');
        //script.type = 'text/javascript';
        script.src = asyncUrl + callbackName;
        document.body.appendChild(script);
    };
    //Start loading google maps
    asyncLoad(asyncUrl, 'googleMapsInitialized');

    //Usage: Initializer.mapsInitialized.then(callback)
    return {
        mapsInitialized: mapsDefer.promise
    };
})