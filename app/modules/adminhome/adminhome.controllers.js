'use strict';

angular.module('adminhome.controllers', ['blockmarket.services', 'angular-syscoin'])
    .controller('AdminHomeCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', function ($rootScope, $scope, $q, blockmarketService, syscoinService) {
        $rootScope.activeView = 'admin'; //sets the style for nav

    }]);