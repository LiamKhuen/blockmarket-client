'use strict';

angular.module('pgp.controllers', ['global.directives', 'blockmarket.services', 'blockmarket.marketconstants', 'blockmarket.appconfig'])
    .controller('PGPCtrl', ['$rootScope', '$scope', '$log', 'blockmarketService', 'EVENTS', 'PGP_PUBLIC_KEY', function ($rootScope, $scope, $log, blockmarketService, EVENTS, PGP_PUBLIC_KEY) {
        $rootScope.activeView = ''; //sets the style for nav

        $log.log("Pubkey:" + PGP_PUBLIC_KEY);

        $scope.pgpKey = PGP_PUBLIC_KEY;
    }]);