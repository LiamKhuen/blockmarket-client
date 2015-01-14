'use strict';

angular.module('home.controllers', ['global.directives', 'blockmarket.services'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', function ($rootScope, $scope, $q, blockmarketService) {
        $rootScope.activeView = 'home'; //sets the style for nav

        $scope.items = blockmarketService.featuredItems();
    }]);