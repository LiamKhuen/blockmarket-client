'use strict';

angular.module('blockmarket.home.controllers', ['blockmarket.common.directives', 'blockmarket.services'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', function ($rootScope, $scope, $q, blockmarketService) {
        $rootScope.activeView = 'home'; //sets the style for nav

        var requests = blockmarketService.getFeaturedItems();

        $scope.items = blockmarketService.featuredItems;
    }]);