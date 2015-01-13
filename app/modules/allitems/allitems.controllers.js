'use strict';

angular.module('allitems.controllers', ['blockmarket.services', 'angular-syscoin'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', function ($rootScope, $scope, $q, blockmarketService, syscoinService) {
        $rootScope.activeView = 'items'; //sets the style for nav

        blockmarketService.getAllItems();

        $scope.items = blockmarketService.allItems();
        $scope.categories = blockmarketService.categories();
    }]);