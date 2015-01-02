'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'syscoin'])
    .factory('blockmarketService', ['$http', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', function($http, $q, HOST, FEATURED_ITEMS, syscoinService) {

        //returns request objects to get all the featured items
        function getFeaturedItems() {
            //iterate over all featured items and get the full data
            var items = new Array();
            var totalItems = 0;
            var requests = new Array();
            var request;
            for(var i = 0; i < FEATURED_ITEMS.length; i++) {
                request = syscoinService.offerInfo(FEATURED_ITEMS[i]);
                requests.push(request);
            }

            return requests;
        }

        //parses the featured items once asynchronously returned
        function parseFeaturedItems(responses) {
            var items = new Array();
            console.log("TOTAL RESULTS: " + responses.length);
            for(var i = 0; i < responses.length; i++) {
                if(responses[i].data.result) {
                    //only add confirmed items that aren't expired
                    responses[i].data.result.description = angular.fromJson(responses[i].data.result.description);
                    //console.log("Offer desc:", responses[i].data.result);
                    items.push(responses[i].data.result);
                }
            }

            return items;
        }


        // Return public API.
        return {
            getFeaturedItems: getFeaturedItems,
            parseFeaturedItems: parseFeaturedItems
        };
    }]);