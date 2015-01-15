'use strict';

angular.module('home.controllers', ['global.directives', 'blockmarket.services'])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$q', '$log', 'blockmarketService', function ($rootScope, $scope, $q, $log, blockmarketService) {
        $rootScope.activeView = 'home'; //sets the style for nav

        $scope.featuredItems = blockmarketService.featuredItems();
    }]);