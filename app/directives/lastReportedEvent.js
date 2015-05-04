'use strict';

angular.module('ppMobi')
.directive('lastReportedEvent', [function () {
    return {
        template: '<h4 class="list-group-item-heading">'+
            '<span ng-class="getInJourneyClass(eventData)"></span>' +
            '<span class="journeyStatus unitNameHeading" ng-bind="eventData.UnitName"></span></h4>' +
            '<p class="list-group-item-text" ng-bind="eventData.Location"></p>' +
            '<ul class="list-inline eventIconContainer">' +
                '<li>'+
                '<span ng-class="getReportReasonCls(eventData)"></span>' +
                '<span class="label label-default"><strong ng-bind="eventData.EventDTDisplay"></strong></span>' +
                '</li>'+
            '</ul>',
        restrict: 'AE',
        scope: {
            eventData: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.getInJourneyClass = function (event) {
                return 'journeyStatus ' + (event.InJourney ? 'vehicleInJourney' : 'vehicleOutJourney');
            };
            $scope.getReportReasonCls = function (event) {
                return "Icon16 Urr" + event.UrrID;
            };
        }
    };
}]);