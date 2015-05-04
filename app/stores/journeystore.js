'use strict';

angular.module('ppMobi')
.factory('JourneyStore',[function () {

    var journeys = {};

    return {
        journeys: journeys,

        transformResponseData: function (data) {
            //this.clearJourneyStore();
            data.forEach(function(jnyData) {
                //var jny = journeys[jnyData.id];
                //if (jny) {
                //    journeys[jnyData.id] = angular.extend(jny, jnyData);
                //} else {
                    journeys[jnyData.id] = jnyData;
                //}
            });

        },

        clearJourneyStore: function(){
            //Was tempted in just assigning a new empty object here, but realised that would have been the wrong approach
            for (var index in journeys) {
                delete journeys[index];
            }
        }

    };
}]);