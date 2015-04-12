'use strict';

angular.module('allitems.controllers', ['blockmarket.services','blockmarket.marketconstants', 'ui.bootstrap'])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$q', '$log', 'blockmarketService', 'EVENTS', 'BANNED_ITEMS',
        function ($rootScope, $scope, $q, $log, blockmarketService, EVENTS, BANNED_ITEMS) {
        $rootScope.activeView = 'items'; //sets the style for nav

        blockmarketService.getAllItems();

        $scope.$on(EVENTS.all_items_loaded, function(event, items) {

            //remove banned items
            var displayableItems  = new Array();
            var displayItem = true;
            for(var i = 0; i < items.length; i ++) {
                displayItem = true;
                for(var j = 0; j < BANNED_ITEMS.length; j++) {
                    if(items[i] == null || items[i].id == BANNED_ITEMS[j]) {
                        displayItem = false;
                        break;
                    }
                }

                if(!displayItem) {
                    continue;
                }else{
                    displayableItems.push(items[i]);
                }
            }

            $scope.categories = blockmarketService.getCachedCategories();
            $scope.items = displayableItems;

            $log.log("Displayable items:",  $scope.items);
            $log.log("categories :", $scope.categories);
        });
    }]);