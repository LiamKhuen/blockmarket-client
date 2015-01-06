'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'syscoin'])
    .service('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinService) {

        //public vars
        var allItems = [];
        var featuredItems = [];
        var categories = [];

        var itemGuids = [];
        var currentItemGuidIndex = 0;


        //returns request objects to get all the featured items
        function getFeaturedItems() {
            //iterate over all featured items and get the full data
            //featuredItems = [];
            currentItemGuidIndex = 0;

            itemGuids = FEATURED_ITEMS; //set to featured items to only fetch the featured subset
            getItem(FEATURED_ITEMS[currentItemGuidIndex]);
        }

        //returns request object to get ALL the items in this marketplace
        function getItems() {
            console.log("getItems");
            //clear any existing items
            //allItems = [];
            //featuredItems = [];
            currentItemGuidIndex = 0;

            return syscoinService.offerList().then(function(response) {
                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < response.data.result.length; i++) {
                    //if the offer is not expired, add it to the queue to get full data on it
                    if (response.data.result[i].expired == undefined) {
                        console.log("Adding item: ", response.data.result[i]);
                        itemGuids.push(response.data.result[i].name);
                    }
                }

                console.log("Total items: " + itemGuids.length);

                return getItem(itemGuids[currentItemGuidIndex]);
            });
        }

        //get categories for the marketplaces based on the categories of the items
        function getCategories() {
            //stub
        }

        function getItem(guid) {
            var item;
            syscoinService.offerInfo(guid).success(function(response) {
                console.log('RESULT', response);
                item = response.result;
                item.description = JSON.parse(item.description);
                allItems.push(item);

                angular.forEach(FEATURED_ITEMS, function(itemGuid) {
                    if(item.id === itemGuid) {
                        featuredItems.push(item);
                    }
                });


                //chain next call
                if(currentItemGuidIndex < itemGuids.length-1) {
                    currentItemGuidIndex++;
                    getItem(itemGuids[currentItemGuidIndex]);
                }
            });
        }

        //parses the item responses once asynchronously returned
        function parseItemResponses(responses) {
            var items = new Array();
            console.log("TOTAL RESULTS: " + responses.length);
            for(var i = 0; i < responses.length; i++) {
                if(responses[i].data.result) {
                    //only add confirmed items that aren't expired
                    responses[i].data.result.description = JSON.parse(responses[i].data.result.description);
                    //console.log("Offer desc:", responses[i].data.result);
                    items.push(responses[i].data.result);
                }
            }

            return items;
        }

        // Return public API.
        return {
            allItems: allItems,
            featuredItems: featuredItems,

            getFeaturedItems: getFeaturedItems,
            getItems: getItems,
            parseItemResponses: parseItemResponses
        };
    }]);