'use strict';

angular.module('itemdetail.controllers', ['blockmarket.services'])
    .controller('ItemDetailCtrl', ['$scope', '$route', '$routeParams', 'blockmarketService', '$log', '$q', function ($scope, $route, $routeParams, blockmarketService, $log, $q) {
        $scope.itemDetailActive = true; //sets the style for nav

        $log.log("Getting item details for params: ", $routeParams);

        var promise = blockmarketService.getItem($routeParams.guid).then(function(item) {
            $log.log("Got result: ", item);
            $scope.item = item;
        });


    }]);