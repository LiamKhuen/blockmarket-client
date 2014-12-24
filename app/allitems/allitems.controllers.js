'use strict';

angular.module('blockmarket.allitems.controllers', ['syscoin.services'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$route', 'syscoinService', 'syscoinService2', function ($rootScope, $scope, $route, syscoinService, syscoinService2) {
        $rootScope.activeView = 'items'; //sets the style for nav

        //TODO: refactor to us a .all() request
        //fetch all items
        /*var request = syscoinService.offerList();
        request.then(function(response) {
            console.log("offerList:", response);
            //iterate over all of the offers and get the full data
            var items = new Array();
            var totalItems = 0;
            var callbacks = 0;
            for(var i = 0; i < response.data.length; i++) {
                console.log('result[' + i + '].offer = ' +  response.data[i].name + ' ' + response.data[i].value);
                if (response.data[i].expired == undefined) {
                    totalItems ++;
                    var request2 = syscoinService.offerInfo(response.data[i].name);
                    request2.then(function(response2) {
                        console.log("offerInfo:", response2);
                        if(response2.data) { //only add confirmed items
                            items.push(response2.data);
                        }

                        callbacks++;

                        if(callbacks >= totalItems) {
                            $scope.items = items;
                        }
                    });
                }}
        }); */

        //dummy call to syscoin service for now
       // var request = syscoinService.getInfo();

        syscoinService2.getInfo({}, {headers: {'X-ACL': 'x@y.z'}}).
            success(function(data) { console.log("success on getinfo!", data); }).
            error(function(error) { console.log("error on getinfo!", error); });
    }]);