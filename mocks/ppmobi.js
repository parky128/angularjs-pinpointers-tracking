'use-strict';
var app = angular.module('ppMobi', []);

app.constant('constants', {
	foo: 'bar'
});

app.value('globals', {
	selectedUntID: null,
	selectedUntRecord: {}
});