angular.module('syscoin.services', ['blockmarket.appconfig', 'jsonrpc'])
    .service('syscoinService' ['Base64', '$http', '$q', 'RPC_CONFIG', 'syscoinService2', function(Base64, $http, $q, RPC_CONFIG, jsonrpc) {

        var rpcUrl = RPC_CONFIG.HOST + ":" + RPC_CONFIG.PORT + "/";
        var authdata = Base64.encode(RPC_CONFIG.USERNAME + ':' + RPC_CONFIG.PASSWORD);

        var service = jsonrpc.newService('syscoinsvc');
        this.getInfo2 = service.createMethod('getInfo');

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line

        function getAuthHeader() {
            return  'Basic ' + authdata;
        }

        function getInfo() {
            console.log("getInfo()");
            var request = $http({
                method: "post",
                url: rpcUrl,
                headers: {
                    "X-Requested-With" : "XMLHttpRequest"
                },
                data: {
                    "method" : "getinfo"
                }
            });

            locationService.save({lat: 22, long: 33}, {headers: {'X-ACL': 'x@y.z'}}).
                success(function(data) {}).
                error(function(error) {})

            return( request );
        }

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
            var authdata = Base64.encode(RPC_CONFIG.USERNAME + ':' + RPC_CONFIG.PASSWORD);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line

            var request = $http({
                method: "post",
                withCredentials: true,

                url: rpcUrl,
                data: {
                    "method":"getinfo"
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
            console.log("offerInfo( " + guid + ")");
            var request = $http({
                method: "POST",
                url: rpcUrl + "offerinfo.json",
                data: {
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
            getInfo: getInfo,
            offerNew: offerNew,
            listTransactions: listTransactions,
            offerList: offerList,
            offerInfo: offerInfo,
            certissuerList: certissuerList,
            aliasList: aliasList,
            getRawTransaction: getRawTransaction,
            decodeRawTransaction: decodeRawTransaction
        };
    }])
