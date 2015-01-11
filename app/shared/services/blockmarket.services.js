'use strict';

angular.module('blockmarket.services', ['blockmarket.appconfig', 'blockmarket.marketconfig', 'angular-syscoin'])
    .service('blockmarketService', ['$http', '$timeout', '$q', 'HOST', 'FEATURED_ITEMS', 'syscoinService', '$log', function($http, $timeout, $q, HOST, FEATURED_ITEMS, syscoinService, $log) {

        //public vars
        var _allItems = [];
        var _featuredItems = [];
        var _categories = [];

        var _itemGuids = [];


        this.featuredItems = function() {
            return _featuredItems;
        }

        this.allItems = function() {
            return _allItems;
        }

        this.currentItem = function() {
            return _currentItem;
        }

        //returns request objects to get all the featured items
        this.getFeaturedItems = function() {
            //iterate over all featured items and get the full data
            _featuredItems = [];

            _itemGuids = FEATURED_ITEMS; //set to featured items to only fetch the featured subset


            var _this = this;
            var promises = [];
            angular.forEach(FEATURED_ITEMS, function(itemGuid) {
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
            //clear any existing items
            _allItems = [];
            _itemGuids = [];

            var _this = this;
            syscoinService.offerList().then(function(response) {
                //iterate over offers and get the full data of non expired offers
                for(var i = 0; i < response.data.result.length; i++) {
                    //if the offer is not expired, add it to the queue to get full data on it
                    if (response.data.result[i].expired == undefined) {
                        console.log("Adding item: ", response.data.result[i]);
                        _itemGuids.push(response.data.result[i].name);
                    }
                }

                console.log("Total items: " + _itemGuids.length);

                var promises = [];
                angular.forEach(_itemGuids, function(itemGuid) {
                    promises.push(_this.getItem(itemGuid));
                });

                $q.all(promises).then(function(responses) {
                    for(var i = 0; i < responses.length; i ++) {
                        $log.log("response in getItems: ", responses);
                        _allItems.push(responses[i]);
                    }
                });
            });
        }

        //get categories for the marketplaces based on the categories of the items
        function getCategories() {
            //stub
        }

        this.getItem = function(guid) {
            var item;

            var deferred = $q.defer();
            syscoinService.offerInfo(guid).then(function(response) {
                console.log('RESULT', response);
                item = response.data.result;
                item.description = JSON.parse(item.description);
                deferred.resolve(item);
            });

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
                    //console.log("Offer desc:", responses[i].data.result);
                    items.push(responses[i].data.result);
                }
            }

            return items;
        }

    }]);