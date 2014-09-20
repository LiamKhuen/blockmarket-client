'use strict';
angular.module('blockmarket.home.controllers', ['syscoin.services', 'blockmarket.marketconfig'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$route', 'syscoinService', 'FEATURED_ITEMS', function ($rootScope, $scope, $route, syscoinService, FEATURED_ITEMS) {
        $rootScope.activeView = 'home'; //sets the style for nav

        //TODO: refactor to us a .all() request
        //iterate over all featured items and get the full data
        var items = new Array();
        var totalItems = 0;
        var callbacks = 0;
        for(var i = 0; i < FEATURED_ITEMS.length; i++) {
            var request = syscoinService.offerInfo(FEATURED_ITEMS[i]);
            request.then(function(response) {
                console.log("offerInfo:", response);
                if(response.data) { //only add confirmed items
                    items.push(response.data);
                }

                callbacks++;

                if(callbacks >= FEATURED_ITEMS.length) {
                    $scope.items = items;
                }
            });
        }
    }]);