angular.module('blockmarket.services', ['blockmarket.appconfig', 'syscoin.services'])
    .factory('blockmarketService', ['$http', '$q', 'HOST', 'syscoinService', function($http, $q, HOST, syscoinService) {

        function getUnexpiredOffers() {
            console.log("getUnexpiredOffers()");

        }

        // Return public API.
        return {
            getUnexpiredOffers: getUnexpiredOffers
        };
    }]);