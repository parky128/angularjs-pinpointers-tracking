# angularjs-pinpointers-tracking
Vehicle tracking application written with AngularJS and using Bootstrap components

[Video Demo](http://screencast-o-matic.com/watch/cof0offV6O) - last updated 27th Apr 2015

This is my personal AngularJS 'playground' where I am currently putting into practice my learnings from AngularJS and Bootstrap components.

The video above demonstrates my current progress, and I will look to hosting a live demo very soon.

**Updates 27-Apr-2015**
- Create a fully re-usable directive for the left panel vehicle list
- Added map marker infoWindows via marker click listeners
- Added in journey status 'pips' to the vehicle list items (green - in journey, red - out of journey\parked)

**Updates 04-May-2015**
- Left panel now make use of ngRoute and allows selection of a vehicle to load a Journeys view (separate directive).
- The Journeys view shows the current location of the selected vehicle at the top, and stays up to date as new positions are fetched from the server. The map display will also continue to follow the vehicle, this is achieved through using $emit from DataStoreService factory (see 'services' dir)
- Journey History can be requested for a vehicle
- Various Jasmine tests have now been added (see 'specs' dir)

**Road Map**
- Selecting a journey will display the events making up the journey on the map display (snail trail type display)
- Looking to add a Location Search bar (directive) which will be shown at all times in the top toolbar of the application.
