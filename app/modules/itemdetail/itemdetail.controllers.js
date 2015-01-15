'use strict';

angular.module('itemdetail.controllers', ['blockmarket.services', 'ui.bootstrap'])
    .controller('ItemDetailCtrl', ['$scope', '$route', '$routeParams', 'blockmarketService', '$log', '$q', '$modal',
        function ($scope, $route, $routeParams, blockmarketService, $log, $q, $modal) {
        $scope.itemDetailActive = true; //sets the style for nav

        $log.log("Getting item details for params: ", $routeParams);

        var promise = blockmarketService.getItem($routeParams.guid).then(function(item) {
            $scope.item = item;
        });

        $scope.buyItem = function() {
            var modalInstance = $modal.open({
                templateUrl: 'app/shared/partials/buyItemModal.tpl.html',
                controller: 'BuyItemCtrl'
            });
        }
    }]);