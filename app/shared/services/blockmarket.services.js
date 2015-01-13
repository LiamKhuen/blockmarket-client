'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'angular-syscoin'])
    .service('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', '$log', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinService, $log) {

        //public vars exposed via some public function
        var _allItems = [];
        var _featuredItems = [];
        var _categories = [];

        //once the items have been fetched in full, simply reuse the cache rather than recalling
        //the daemon as items are unlikely to change mid-session and if they do, errors will be thrown
        //by the daemon
        var _cacheItems = true;


        /* Simple accessor functions to allow outside access to properties while still using 2way binding */
        this.featuredItems = function() {
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
            var itemGuidsToFetch = FEATURED_ITEMS;
            var itemGuids = FEATURED_ITEMS;

            //cache items in the featured items array into the all items array and only request those
            //that aren't featured
            if(_cacheItems === true && _featuredItems.length > 0) {
                $log.log("Item caching active." + itemGuidsToFetch.length + " items.");
                for(var i = 0; i < itemGuids.length; i++) {
                    var cachedFeaturedItem = containsItem(_featuredItems, itemGuids[i]);
                    if(cachedFeaturedItem !== null) {
                        $log.log("Got a featured item for the cache, for featured items!");

                        //remove the itemGuid from those to be fetched
                        itemGuidsToFetch.splice(i, 1);

                        $log.log("Items remaining to be fetched:" + itemGuidsToFetch.length );
                    }else{
                        $log.log("Featured item NOT FOUND IN CACHE:" + itemGuidsToFetch[i], cachedFeaturedItem );
                    }

                }
            }

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
                        itemGuidsToFetch.push(response.data.result[i].name);
                    }
                }

                console.log("Total items: " + itemGuids.length);

                //cache items in the featured items array into the all items array and only request those
                //that aren't featured
                if(_cacheItems === true && _featuredItems.length > 0) {
                    for(i = 0; i < itemGuids.length; i++) {
                        if(containsItem(_allItems, itemGuidsToFetch[i]) === null) {
                            var cachedFeaturedItem = containsItem(_featuredItems, itemGuidsToFetch[i]);

                            //if the cached featured item is found, add it, and remove it from the items to be fetched
                            if(cachedFeaturedItem !== null) {
                                $log.log("Got a featured item for the cache, adding it to all items!");
                                _allItems.push(cachedFeaturedItem);

                                //remove the itemGuid from those to be fetched
                                itemGuidsToFetch.splice(i, 1);
                            }
                        }
                    }
                }



                var promises = [];
                angular.forEach(itemGuidsToFetch, function(guid) {
                    promises.push(_this.getItem(guid));
                });

                $q.all(promises).then(function(responses) {
                    for(var i = 0; i < responses.length; i ++) {
                        $log.log("response in getItems: ", responses);
                        $log.log("categories: ", _categories);
                        _allItems.push(responses[i]);
                    }
                });
            });
        }

        this.getItem = function(guid) {
            var item;

            var deferred = $q.defer();

            //caching
            var itemFoundInCache = false;
            if(_cacheItems === true && _allItems.length > 0) {
                var cachedItem = containsItem(_allItems, guid);
                if(cachedItem !== null) { //item found
                    $log.log("Got a regular item for the cache!");

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
                    if(containsCategory(_categories, item.category[0]) === null) {
                        $log.log("category added.");
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

    }]);