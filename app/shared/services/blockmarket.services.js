'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'angular-syscoin'])
    .service('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', '$log', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinService, $log) {

        //public vars exposed via some public function
        var _allItems = [];
        var _categories = [];
        var _itemGuids = [];
        var _featuredItems = [];

        //once the items have been fetched in full, simply reuse the cache rather than recalling
        //the daemon as items are unlikely to change mid-session and if they do, errors will be thrown
        //by the daemon
        var _cacheItems = true;


        /* Simple accessor functions to allow outside access to properties while still using 2way binding */
        this.featuredItems = function() {
            _featuredItems = [];
            for(var i = 0; i < FEATURED_ITEMS.length; i++) {
                _featuredItems.push(getCachedItem(FEATURED_ITEMS[i]));
            }

            return _featuredItems;
        }

        this.allItems = function() {
            return _allItems;
        }

        //get categories for the marketplaces based on the categories of the items
        this.categories = function categories() {
            return _categories;
        }

        /* End accessor functions **/

        //returns request objects to get all the featured items
        this.getFeaturedItems = function() {
            //iterate over all featured items and get the full data
            var itemGuids = FEATURED_ITEMS;
            var itemGuidsToFetch = FEATURED_ITEMS;

            var _this = this;
            var promises = [];
            angular.forEach(itemGuidsToFetch, function(itemGuid) {
                promises.push(_this.getItem(itemGuid));
            });

            $q.all(promises).then(function(responses) {
                for(var i = 0; i < responses.length; i ++) {
                    $log.log("response in getFeatured: ", responses);
                    _featuredItems.push(responses[i]);
                }
            });
        }

        //returns request object to get ALL the items in this marketplace
        this.getAllItems = function() {
            console.log("getItems");
            var itemGuidsToFetch = [];
            var itemGuids = [];

            var _this = this;
            syscoinService.offerList().then(function(response) {

                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < response.data.result.length; i++) {
                    //if the offer is not expired, add it to the queue to get full data on it
                    if (response.data.result[i].expired == undefined) {
                        console.log("Adding item: ", response.data.result[i]);
                        itemGuids.push(response.data.result[i].name);
                        _itemGuids.push(response.data.result[i].name);

                        itemGuidsToFetch.push(response.data.result[i].name);
                    }
                }

                console.log("Total items: " + itemGuids.length);

                var promises = [];
                for(i = 0; i < itemGuidsToFetch.length; i++) {
                    promises.push(_this.getItem(itemGuidsToFetch[i]));
                }

                $q.all(promises).then(function(responses) {
                    for(var i = 0; i < responses.length; i ++) {
                        $log.log("response in getItems: ", responses);
                        $log.log("categories: ", _categories);
                        _allItems.push(responses[i]);
                    }
                });
            });
        }

        this.addItem = function (syscoinAddress, item) {
            var deferred = $q.defer();

            syscoinService.offerNew(syscoinAddress, JSON.stringify(item.category), item.title, item.quantity, item.price, JSON.stringify(item.description)).then(function(response){
                $log.log("OfferNew result:", response);
            });

            return deferred.promise;
        }

        this.getItem = function(guid) {
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
                syscoinService.offerInfo(guid).then(function(response) {
                    console.log('RESULT', response);
                    item = response.data.result;
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
        this.parseItemResponses = function(responses) {
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
            for(var i = 0; i < collection.length; i++) {
                if(collection[i] == category);
                    return collection[i];
            }

            return null;
        }

        function getCachedItem(guid) {
            for(var i = 0; i < _allItems.length; i++ ) {
                if(_allItems[i].id == guid) {
                    return _allItems[i];
                }
            }

            return null;
        }

    }]);