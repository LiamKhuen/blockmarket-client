angular.module('syscoin.services', ['blockmarket.appconfig'])
    .service('syscoinService', ['Base64', '$http', '$q', 'RPC_CONFIG', function(Base64, $http, $q, RPC_CONFIG) {

        var rpcUrl = "http://" + RPC_CONFIG.HOST + ":" + RPC_CONFIG.PORT + "/";
        var authdata = Base64.encode(RPC_CONFIG.USERNAME + ':' + RPC_CONFIG.PASSWORD);

        $http.defaults.headers.common['Authorization'] = getAuthHeader(); // jshint ignore:line

        function getAuthHeader() {
            return  'Basic ' + authdata;
        }

        function getInfo() {
            console.log("getInfo()");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"getinfo"
                },
                params: {}
            });

            return( request );
        }

        function offerNew( category, title, quantity, price, description ) {
            console.log("offerNew(" + category + ", " + title + ", " + quantity + ", " + price + ", " + description + ")");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"offernew"
                },
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
                url: rpcUrl,
                data: {
                    "method" : "listtransactions"
                },
                params: {}
            });

            return( request );
        }

        function offerList() {
            console.log("offerList()");

            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"offerlist"
                }
            });

            return( request );
        }

        function certissuerList() {
            console.log("certissuerList()");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"getinfo"
                },
                params: {}
            });

            return( request );
        }

        function aliasList() {
            console.log("aliasList()");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"aliaslist"
                },
                params: {}
            });

            return( request );
        }

        function offerInfo(guid) {
            console.log("offerInfo( " + guid + ")");
            var request = $http({
                method: "post",
                url: rpcUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    "method":"offerinfo"
                }
            });

            return( request );
        }

        function getRawTransaction(txid) {
            console.log("getRawTransaction( " + txid + ")");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"getrawtransaction",
                    "guid": txid
                },
                params: {
                    "guid": txid
                }
            });

            return( request );
        }

        function decodeRawTransaction(rawtx) {
            console.log("decodeRawTransaction( " + rawtx + ")");
            var request = $http({
                method: "post",
                url: rpcUrl,
                data: {
                    "method":"decoderawtransaction"
                },
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
    }]).factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });
