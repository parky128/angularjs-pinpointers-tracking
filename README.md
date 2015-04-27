# angularjs-pinpointers-tracking
Vehicle tracking application written with AngularJS and using Bootstrap components

[Video Demo](http://screencast-o-matic.com/watch/cof0offV6O)

This is my personal AngularJS 'playground' where I am currently putting into practice my learnings from AngularJS and Bootstrap components.

The video above demonstrates my current progress, and I will look to hosting a live demo very soon.

**Updates 27-Apr-2014**

- Create a fully re-usable directive for the left panel vehicle list
- Added map marker infoWindows via marker click listeners
- Added in journey status 'pips' to the vehicle list items (green - in journey, red - out of journey\parked)

**Road Map**

Planning to make use of ngRoute, and provide drill-through capability to the vehicle list. So on selecting a vehicle, this will replace the list, with a new view containing any journeys the vehicle has performed, and a further select of a journey item will replace with another view containing the individual events making up that journey which can also be reviewed on the map.
