'use strict';

angular.module('allitems.controllers', ['blockmarket.services','blockmarket.marketconstants', 'ui.bootstrap'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'EVENTS', function ($rootScope, $scope, $q, blockmarketService, EVENTS) {
        $rootScope.activeView = 'items'; //sets the style for nav

        blockmarketService.getAllItems();

        $scope.$on(EVENTS.all_items_loaded, function(event, items) {
            $scope.items = items;

            $scope.categories = blockmarketService.getCategories();
        });
    }]);