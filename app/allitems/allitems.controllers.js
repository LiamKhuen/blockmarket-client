'use strict';

angular.module('blockmarket.allitems.controllers', ['blockmarket.services', 'syscoin'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', function ($rootScope, $scope, $q, blockmarketService, syscoinService) {
        $rootScope.activeView = 'items'; //sets the style for nav

        blockmarketService.getItems();

        $scope.items = blockmarketService.allItems;
    }]);