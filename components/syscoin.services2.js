angular.module('syscoin.services', ['blockmarket.appconfig', 'jsonrpc'])
    .service('syscoinService2', ['jsonrpc'], function(jsonrpc) {

        var rpcUrl = RPC_CONFIG.HOST + ":" + RPC_CONFIG.PORT + "/";
        var authdata = Base64.encode(RPC_CONFIG.USERNAME + ':' + RPC_CONFIG.PASSWORD);

        var service = jsonrpc.newService('syssvc');

        this.getInfo = service.createMethod('getInfo');

        return {
            getInfo: getInfo
        };
    );
});
