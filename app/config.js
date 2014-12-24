'use strict';

angular.module('blockmarket.appconfig', [])
    .constant('RPC_CONFIG', {
        HOST: '127.0.0.1',
        PORT: '8336',
        USERNAME: 'rpcuser',
        PASSWORD: 'asdfkjdfhvkchbkhadkjwhekfbevsdbdcksjdhfksjkfklshfk'
    });

angular.module('blockmarket.marketconfig', [])
    .constant('FEATURED_ITEMS',['e2c0556df9bd8bdb00']);
