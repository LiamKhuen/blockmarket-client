'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'angular-syscoin-api'])
    .factory('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinAPIService', '$log', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinAPIService, $log) {

        //public vars exposed via some public function
        var _allItems = [];
        var _categories = [];
        var _itemGuids = [];
        var _featuredItems = [];

        //once the items have been fetched in full, simply reuse the cache rather than recalling
        //the daemon as items are unlikely to change mid-session and if they do, errors will be thrown
        //by the daemon
        var _cacheItems = true;

        var getFeaturedItems = function() {
            return _featuredItems;
        }

        //returns request object to get ALL the items in this marketplace
        var getAllItems = function() {
            console.log("getItems");
            var itemGuidsToFetch = [];

            var _this = this;
            syscoinAPIService.offerList().then(function(offers) {
                _featuredItems = [];
                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < offers.data.length; i++) {
                    //if the offer is not expired, add it to the queue to get full data on it
                    if (offers.data[i].expired == undefined) {
                        $log.log("Adding item: ", offers.data[i]);
                        _itemGuids.push(offers.data[i].name);

                        itemGuidsToFetch.push(offers.data[i].name);
                    }
                }

                console.log("Total items: " + itemGuidsToFetch.length);

                for(i = 0; i < itemGuidsToFetch.length; i++) {
                    _this.getItem(itemGuidsToFetch[i]).then(function(item) {
                        _allItems.push(item);

                        //check to see if its featured
                        for(var i = 0; i < FEATURED_ITEMS.length; i++) {
                            if(FEATURED_ITEMS[i] == item.id) {
                                $log.log("fetchin featurd " + item.id);
                                _featuredItems.push(getCachedItem(FEATURED_ITEMS[i]));
                            }
                        }
                    });
                }

            });
        }

        var addItem = function (syscoinAddress, item) {
            var deferred = $q.defer();

            syscoinAPIService.offerNew(syscoinAddress, JSON.stringify(item.category), item.title, item.quantity, item.price, JSON.stringify(item.description)).then(function(response){
                $log.log("OfferNew result:", response);
            });

            return deferred.promise;
        }

        var getItem = function(guid) {
            var item;

            var deferred = $q.defer();

            //caching
            var itemFoundInCache = false;
            if(_cacheItems === true && _allItems.length > 0) {
                var cachedItem = containsItem(_allItems, guid);
                if(cachedItem !== null) { //item found
                    $log.log("Got a regular item from the cache!");

                    //TODO refactor
                    if(containsCategory(_categories, cachedItem.category[0]) === null) {
                        $log.log("category added.");
                        _categories.push(cachedItem.category[0]);
                    }

                    deferred.resolve(cachedItem);
                    itemFoundInCache = true;
                    return deferred.promise;
                }
            }

            if(itemFoundInCache === false) {
                syscoinAPIService.offerInfo(guid).then(function(response) {
                    console.log('RESULT', response);
                    item = response.data;
                    item.description = JSON.parse(item.description);
                    item.category = JSON.parse(item.category);

                    $log.log("Item category: " + item.category[0]);

                    //TODO refactor
                    if(containsCategory(_categories, item.category[0]) === null) {
                        $log.log("category added via other route.");
                        _categories.push(item.category[0]);
                    }

                    deferred.resolve(item);
                });
            }

            return deferred.promise;
        }

        //parses the item responses once asynchronously returned
        var parseItemResponses = function(responses) {
            var items = new Array();
            console.log("TOTAL RESULTS: " + responses.length);
            for(var i = 0; i < responses.length; i++) {
                if(responses[i].data.result) {
                    //only add confirmed items that aren't expired
                    responses[i].data.result.description = JSON.parse(responses[i].data.result.description);
                    items.push(responses[i].data.result);
                }
            }

            return items;
        }

        /**
         * Determines if a collection contains an offer
         * @param collection collection of items to check for an offer
         * @param guid offer guid to find
         * @returns {item} if guid found or null
         */
        function containsItem(collection, guid) {
            for(var i = 0; i < collection.length; i++) {
                if(collection[i].id == guid)
                    return collection[i];
            }

            return null;
        }

        /**
         * Determines if a collection contains a given category
         * @param collection of categories
         * @param category to search for
         */
        function containsCategory(collection, category) {
            $log.log("Checking if category " + category + " exists in", collection);
            for(var i = 0; i < collection.length; i++) {
                if(collection[i] == category);
                    return collection[i];
            }

            return null;
        }

        function getCachedItem(guid) {
            $log.log("Searching for cached item: " + guid + "in:", _allItems);
            for(var i = 0; i < _allItems.length; i++ ) {
                if(_allItems[i].id == guid) {
                    $log.log("Item found");
                    return _allItems[i];
                }
            }

            $log.log("ITEM NOT FOUND- " + guid);
            return null;
        }

        return {
            getAllItems: getAllItems,
            getItem: getItem,

            allItems: function() { return _allItems; },
            featuredItems: function() { return _featuredItems; },
            categories: function() { return _categories; }
        }

    }]);