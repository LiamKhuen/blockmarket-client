'use strict';

angular.module('home.controllers', ['global.directives', 'blockmarket.services', 'blockmarket.marketconstants'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$log', 'blockmarketService', 'EVENTS', function ($rootScope, $scope, $log, blockmarketService, EVENTS) {
        $rootScope.activeView = 'home'; //sets the style for nav

        blockmarketService.getFeaturedItems();

        $scope.$on(EVENTS.featured_items_loaded, function(event, items) {
            $scope.featuredItems = items;
        })
    }]);