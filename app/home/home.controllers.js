'use strict';

angular.module('blockmarket.home.controllers', ['syscoin', 'blockmarket.marketconfig', 'blockmarket.common.directives'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$q', '$route', 'syscoinService', 'FEATURED_ITEMS', function ($rootScope, $scope, $q, $route, syscoinService, FEATURED_ITEMS) {
        $rootScope.activeView = 'home'; //sets the style for nav

        //iterate over all featured items and get the full data
        var items = new Array();
        var totalItems = 0;
        var requests = new Array();
        var request;
        for(var i = 0; i < FEATURED_ITEMS.length; i++) {
            request = syscoinService.offerInfo(FEATURED_ITEMS[i]);
            requests.push(request);
        }

        $q.all(requests).then(function(responses) {
            for(var i = 0; i < responses.length; i++) {
                //console.log("TOTAL RESULTS: " + responses.length);
                if(responses[i].data.result) {
                    //only add confirmed items that aren't expired
                    responses[i].data.result.description = angular.fromJson(responses[i].data.result.description);
                    //console.log("Offer desc:", responses[i].data.result);
                    items.push(responses[i].data.result);
                }
            }

            $scope.items = items;
        });
    }]);