app.factory('LastReportedEventStore',['helpersFactory','constants', function (helpersFactory, constants) {

    var lastReportedEvents = [], idProperty = 'UntID', dateFields = ['EventDT', 'EventDTUTC'];

    return {
        lastReportedEvents: lastReportedEvents,

        transformResponseData: function (data) {
            var preparedData = this.parseDatesFromResponse(data);
            
            if (lastReportedEvents.length === 0) {
                lastReportedEvents.push.apply(lastReportedEvents, helpersFactory.replaceDemoNames(preparedData));
            } else {
                this.processLastReportedEventUpdates(preparedData);
            }
        },

        parseDatesFromResponse: function (data) {
            for (var d = 0, len = data.length; d < len; d += 1) {
                for (i = 0; i < dateFields.length; i++) {
                    data[d][dateFields[i]] = new Date(data[d][dateFields[i]]);
                }
            }

            return data;
        },


        processLastReportedEventUpdates: function (updates) {

            for (var d = 0, len = updates.length; d < len; d += 1) {
                var newData = updates[d], demoName;
                //Check if this particular unit (vehicle) has a demo name we need to display
                demoName = constants.demoNames[newData[idProperty]];
                if (angular.isString(demoName)) {
                    newData.UnitName = demoName;
                }
                
                var item = this.getByID(newData[idProperty]);
                if (item === null) {
                    //Item does not exist so add here
                    lastReportedEvents.push(newData);
                }
                else {
                    //Item already exists, so we need to process any new values and update the store
                    this.updateData(newData);
                }
            }
        },

        getByID: function (id) {
            for (var d = 0, len = lastReportedEvents.length; d < len; d += 1) {
                if (lastReportedEvents[d][idProperty] === id) {
                    return lastReportedEvents[d];
                }
            }
        },

        updateData: function (newData) {
            for (var d = 0, len = lastReportedEvents.length; d < len; d += 1) {
                if (lastReportedEvents[d][idProperty] === newData[idProperty]) {
                    //Straight copy (re-assignment of data on top of existing)
                    lastReportedEvents[d] = newData;
                }
            }
        }

    };

}]);