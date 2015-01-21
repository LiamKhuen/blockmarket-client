'use strict';

angular.module('allitems.controllers', ['blockmarket.services', 'ui.bootstrap'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', function ($rootScope, $scope, $q, blockmarketService) {
        $rootScope.activeView = 'items'; //sets the style for nav

       // blockmarketService.getAllItems();

        $scope.items = blockmarketService.allItems();
        $scope.categories = blockmarketService.categories();
    }]);