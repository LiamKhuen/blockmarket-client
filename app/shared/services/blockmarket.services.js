'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconstants', 'angular-syscoin-api'])
    .service('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinAPIService', '$log', 'EVENTS', '$rootScope', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinAPIService, $log, EVENTS, $rootScope) {

        var _categories = [];
        var _allItems = [];
        var _itemGuids = [];

        function addItem(syscoinAddress, item) {
            var deferred = $q.defer();
            syscoinAPIService.offerNew(syscoinAddress, JSON.stringify(item.category), item.title, item.quantity, item.price, JSON.stringify(item.description)).then(function(response){
                $log.log("OfferNew result:" , response);

                if(response.data) {
                    $log.log("Activating offer:" + response.data[1]);
                    syscoinAPIService.offerActivate(response.data[1]).then(function(response) {
                        $log.log("OfferActivate result: ", response);
                        if(response.data)
                            deferred.resolve(response.data);

                        deferred.reject(response);
                    });
                }
            });

            return deferred.promise;
        }

        function updateItem(item) {
            var deferred = $q.defer();
            $log.log("Updating offer:" + item.id);
            syscoinAPIService.offerUpdate(item.id, JSON.stringify(item.category), item.title, item.quantity, item.price, JSON.stringify(item.description)).then(function(response){
                $log.log("OfferUpdate result:" , response);

                if(response.data) {
                    deferred.resolve(response.data);
                }
            });

            return deferred.promise;
        }

        function renewItem(itemGuid) {
            var deferred = $q.defer();
            syscoinAPIService.offerRenew(itemGuid).then(function(response){
                $log.log("OfferRenew result:" , response);

                if(response.data) {
                    deferred.resolve(response.data);
                }
            });

            return deferred.promise;
        }

        function getCategories() {
            $log.log("GET CATEGORIES" + _categories.length);
            if(_categories.length == 0 ) {
                $log.log("Something should be done to fetch the categories.");
                var itemGuidsToFetch = [];
                var _this = this;
                syscoinAPIService.offerList().then(function(offers) {
                    //iterate over offers and get the full data of non expired offers
                    for(var i = 0; i < offers.data.length; i++) {
                        //if the offer is not expired, add it to the queue to get full data on it
                        if (offers.data[i].expired == undefined) {
                            $log.log("Adding item: ", offers.data[i]);
                            _itemGuids.push(offers.data[i].name);

                            itemGuidsToFetch.push(offers.data[i].name);
                        }
                    }

                    $log.log("Total items for categories: " + itemGuidsToFetch.length);

                    var promises = [];
                    for(i = 0; i < itemGuidsToFetch.length; i++) {
                        promises.push(_this.getItem(itemGuidsToFetch[i]));
                    }

                    $q.all(promises).then(function(items) {
                        $rootScope.$broadcast(EVENTS.all_categories_loaded, _categories);
                    })
                });
            }else{
                return _categories;
            }
        }

        function getFeaturedItems() {
            var promises = [];
            for (var i = 0; i < FEATURED_ITEMS.length; i++) {
                var itemGuid = FEATURED_ITEMS[i];
                promises.push(getItem(itemGuid));
            }

            $q.all(promises).then(function(items) {
                $log.log("got all the featured items!", items);
                $rootScope.$broadcast(EVENTS.featured_items_loaded, items);
            });
        }

        //returns request object to get ALL the items in this marketplace
        function getAllItems() {
            var itemGuidsToFetch = [];

            var _this = this;
            syscoinAPIService.offerList().then(function(offers) {
                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < offers.data.length; i++) {
                    //if the offer is not expired, add it to the queue to get full data on it
                    if (offers.data[i].expired == 0) {
                        $log.log("Adding item: ", offers.data[i]);
                        _itemGuids.push(offers.data[i].name);

                        itemGuidsToFetch.push(offers.data[i].name);
                    }
                }

                $log.log("Total items: " + itemGuidsToFetch.length);

                var promises = [];
                for(i = 0; i < itemGuidsToFetch.length; i++) {
                    promises.push(_this.getItem(itemGuidsToFetch[i]));
                }

                $q.all(promises).then(function(items) {
                    _allItems = items;
                    $rootScope.$broadcast(EVENTS.all_items_loaded, items);
                })
            });
        }


        //returns a "lite" item list, includes expired items
        function getItemList() {
            var itemGuidsToFetch = [];

            var _this = this;
            var deferred = $q.defer();
            syscoinAPIService.offerList().then(function(result) {
                deferred.resolve(result.data);
            });

            return deferred.promise;
        }

        function getItem(guid) {
            var item;

            var deferred = $q.defer();

            syscoinAPIService.offerInfo(guid).then(function(response) {
                $log.log('RESULT', response);
                item = response.data;
                item.description = JSON.parse(item.description);
                item.category = JSON.parse(item.category);

                $log.log('ITEM', item);

                $log.log("Item category: " + item.category[0]);

                //TODO refactor
                if(containsCategory(_categories, item.category[0]) === null) {
                    $log.log("category added: " + item.category[0]);
                    _categories.push(item.category[0]);
                }

                deferred.resolve(item);
            });

            return deferred.promise;
        }

        //formats an item description according to the official JSON offer spec
        function formatItem(title, category, quantity, price, description, images, EIN, UPC, website, deliveryMethod, itemLocation, deliveryTime, shipMethod, condition) {
            //format the description object according to the spec
            var item = {
                quantity: quantity,
                price: price,
                title: title,
                description: {
                    description: description,
                    images: [ images[0] ], /* only support a single image for now, wrapped in array for multi image support later */
                    EIN: EIN,
                    UPC: UPC,
                    website: website,
                    deliveryMethod: deliveryMethod,
                    location: item.description.location,
                    deliveryTime: item.description.deliveryTime,
                    shipMethod: item.description.shipMethod,
                    condition: item.description.condition
                },

                category: [ category[0] ] /* only support a single category for now, but wrap in array for later extended support for multuple categories */
            };

            return item;
        }

//        //parses the item responses once asynchronously returned
//        function parseItemResponses(responses) {
//            var items = new Array();
//            console.log("TOTAL RESULTS: " + responses.length);
//            for(var i = 0; i < responses.length; i++) {
//                if(responses[i].data.result) {
//                    //only add confirmed items that aren't expired
//                    responses[i].data.result.description = JSON.parse(responses[i].data.result.description);
//                    items.push(responses[i].data.result);
//                }
//            }
//
//            return items;
//        }

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
                if(collection[i] == category)
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
            getFeaturedItems: getFeaturedItems,
            getCategories: getCategories,
            getItemList: getItemList,
            addItem: addItem,
            updateItem: updateItem,
            renewItem: renewItem,
            formatItem: formatItem
        }

    }]);