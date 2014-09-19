angular.module('syscoin.services', [])
    .factory('syscoinService', ['$http', '$q', function($http, $q) {

        function offerNew( category, title, quantity, price, description ) {
            console.log("offerNew(" + category + ", " + title + ", " + quantity + ", " + price + ", " + description + ")");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/offernew",
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

        function listTransactions() {
            console.log("listTransactions()");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/listtransactions",
                params: {
                }
            });

            return( request );
        }

        function offerList() {
            console.log("offerList()");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/offerlist",
                params: {
                }
            });

            return( request );
        }

        function certissuerList() {
            console.log("certissuerList()");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/certissuerList",
                params: {
                }
            });

            return( request );
        }

        function aliasList() {
            console.log("aliasList()");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/aliaslist",
                params: {
                }
            });

            return( request );
        }

        function offerInfo(guid) {
            console.log("getItem( " + guid + ")");
            var request = $http({
                method: "post",
                url: serviceUrl + "/rpc/offerinfo",
                params: {
                    guid: guid
                }
            });

            return( request );
        }

        function getRawTransaction(txid) {
            console.log("getRawTransaction( " + txid + ")");
            var request = $http({
                method: "post",
                url: serviceUrl + "/api/getrawtransaction",
                params: {
                    guid: txid
                }
            });

            return( request );
        }

        function decodeRawTransaction(rawtx) {
            console.log("decodeRawTransaction( " + rawtx + ")");
            var request = $http({
                method: "post",
                url: serviceUrl + "/api/decoderawtransaction",
                params: {
                    guid: txid
                }
            });

            return( request );
        }


        // Return public API.
        return {
            offerNew: offerNew,
            listTransactions: listTransactions,
            offerList: offerList,
            offerInfo: offerInfo,
            certissuerList: certissuerList,
            aliasList: aliasList,
            getRawTransaction: getRawTransaction,
            decodeRawTransaction: decodeRawTransaction
        };
    }]);