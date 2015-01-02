'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'syscoin'])
    .factory('blockmarketService', ['$http', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', function($http, $q, HOST, FEATURED_ITEMS, syscoinService) {

        var allItems = new Array();
        var categories = [];

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

        //returns request object to get ALL the items in this marketplace
        function getItems() {
            var request = syscoinService.offerList();
            var requests = new Array();
            request.then(function(response) {
                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < response.data.result.length; i++) {
                    console.log('result[' + i + '].offer = ' +  response.data.result[i].name + ' ' + response.data.result[i].value);

                    //if the offer is not expired, add it to the queue to get full data on it
                    if (response.data.result[i].expired == undefined) {
                        requests.push(syscoinService.offerInfo(response.data.result[i].name));
                    }
                }

                console.log("Total requests: " + requests.length);

                $q.all(requests).then(function(responses) {
                    console.log("RESPONSESSSS:", responses);
                    allItems = blockmarketService.parseItemResponses(responses);
                });
            });
        }

        //get categories for the marketplaces based on the categories of the items
        function getCategories() {
            //stub
        }

        //parses the item responses once asynchronously returned
        function parseItemResponses(responses) {
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
            allItems: allItems,

            getFeaturedItems: getFeaturedItems,
            getItems: getItems,
            parseItemResponses: parseItemResponses
        };
    }]);