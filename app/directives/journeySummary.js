'use strict';

angular.module('ppMobi')
.directive('journeySummary', [function () {
    return {
        template: '<span ng-class="getReportReasonClass(journeyData.iconCls)"></span><b>{{journeyData.eventDT}}</b> - {{journeyData.description}}',
        restrict: 'AE',
        scope: {
            journeyData: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.getReportReasonClass = function (iconCls) {
                return iconCls + ' journeySummaryReportReason';
            };

        }
    };
}]);