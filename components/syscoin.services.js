angular.module('syscoin.services', ['blockmarket.appconfig'])
    .factory('syscoinService', ['$http', '$q', 'HOST', function($http, $q, HOST) {

        function offerNew( category, title, quantity, price, description ) {
            console.log("offerNew(" + category + ", " + title + ", " + quantity + ", " + price + ", " + description + ")");
            var request = $http({
                method: "post",
                url: HOST + "/rpc/offernew",
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
                url: HOST + "/rpc/listtransactions",
                params: {
                }
            });

            return( request );
        }

        function offerList() {
            console.log("offerList()");
            var request = $http({
                method: "post",
                url: HOST + "/rpc/offerlist",
                params: {
                }
            });

            return( request );
        }

        function certissuerList() {
            console.log("certissuerList()");
            var request = $http({
                method: "post",
                url: HOST + "/rpc/certissuerList",
                params: {
                }
            });

            return( request );
        }

        function aliasList() {
            console.log("aliasList()");
            var request = $http({
                method: "post",
                url: HOST + "/rpc/aliaslist",
                params: {
                }
            });

            return( request );
        }

        function offerInfo(guid) {
            console.log("getItem( " + guid + ")");
            var request = $http({
                method: "POST",
                url: HOST + "/rpc/offerinfo",
                params: {
                    offerGuid: guid
                }
            });

            return( request );
        }

        function getRawTransaction(txid) {
            console.log("getRawTransaction( " + txid + ")");
            var request = $http({
                method: "post",
                url: HOST + "/api/getrawtransaction",
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
                url: HOST + "/api/decoderawtransaction",
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