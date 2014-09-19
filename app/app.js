'use strict';

// Declare app level module which depends on filters, and services
angular.module('blockmarket', [
    'ngRoute',
    'blockmarket.home.controllers',
    'blockmarket.allitems.controllers',
    'blockmarket.itemdetail.controllers',
    'syscoin.services'
]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { controller:'HomeCtrl', templateUrl:'app/home/home.tpl.html'});
    $routeProvider.when('/items', { controller:'AllItemsCtrl', templateUrl:'app/allitems/allitems.tpl.html'});
    $routeProvider.when('/item/:guid', { controller:'ItemDetailCtrl', templateUrl:'app/itemdetail/itemdetail.tpl.html'});
    $routeProvider.otherwise({ redirectTo:'/' });
}]);

angular.module('blockmarket.services', [])
    .factory('syscoinService', ['$http', '$q', function($http, $q) {
        // add an item with the given params to the blockchain
        var addItem = function( category, title, quantity, price, description ) {
            console.log("addItem(" + category + ", " + title + ", " + quantity + ", " + price + ", " + description + ")");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/additem",
                params: {
                    category: category,
                    title: title,
                    quantity: quantity,
                    price: price,
                    description: description
                }
            });

            return( request );
        }

        var getPendingItems = function() {
            console.log("getPendingItems()");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getpendingitems",
                params: {
                }
            });

            return( request );
        }

        var getItems = function() {
            console.log("getItems()");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getitems",
                params: {
                }
            });

            return( request );
        }

        var getCertIssuers = function() {
            console.log("getCertIssuers()");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getCertIssuers",
                params: {
                }
            });

            return( request );
        }

        var getAliases = function() {
            console.log("getAliases()");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getAliases",
                params: {
                }
            });

            return( request );
        }

        var getItem = function(guid) {
            console.log("getItem( " + guid + ")");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getitem",
                params: {
                    guid: guid
                }
            });

            return( request );
        }

        var getRawTransaction = function(txid) {
            console.log("getRawTransaction( " + txid + ")");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/getRawTransaction",
                params: {
                    guid: txid
                }
            });

            return( request );
        }

        var decodeRawTransaction = function(rawtx) {
            console.log("decodeRawTransaction( " + rawtx + ")");
            var request = $http({
                method: "get",
                url: serviceUrl + "/api/decodeRawTransaction",
                params: {
                    guid: txid
                }
            });

            return( request );
        }


        // Return public API.
        return {
            addItem: function(category, title, quantity, price, description) { return addItem(category, title, quantity, price, description); },
            getPendingItems: function() { return getPendingItems(); },
            getItems: function() { return getItems(); },
            getItem: function(guid) { return getItem(guid); },
            getCertIssuers: function() { return getCertIssuers(); },
            getAliases: function() {return getAliases(); },
            getRawTransaction: function(txid) { return getRawTransaction(txid); },
            decodeRawTransaction: function(rawtx) { return decodeRawTransaction(rawtx); }
        };
    }]);