'use strict';

angular.module('itemdetail.controllers', ['blockmarket.services', 'ui.bootstrap', 'adminhome.controllers', 'blockmarket.marketconstants'])
    .controller('ItemDetailCtrl', ['$scope', '$route', '$routeParams', 'blockmarketService', '$log', '$q', '$modal', 'EVENTS',
        function ($scope, $route, $routeParams, blockmarketService, $log, $q, $modal, EVENTS) {
        $scope.itemDetailActive = true; //sets the style for nav

        $log.log("Getting item details for params: ", $routeParams);

        $scope.categories = blockmarketService.getCategories();

        $scope.$on(EVENTS.all_categories_loaded, function(event, categories) {
            $scope.categories = categories;
        });

        blockmarketService.getItem($routeParams.guid).then(function(item) {
            $scope.item = item;
        });

        $scope.buyItem = function() {
            var modalInstance = $modal.open({
                templateUrl: 'app/shared/partials/buyItemModal.tpl.html',
                controller: 'BuyItemCtrl',
                resolve:{
                    item: function () {
                        return $scope.item;
                    }
                }
            });
        }
    }])
    .controller('BuyItemCtrl', ['$rootScope', '$scope', '$log', '$modalInstance', 'item', function ($rootScope, $scope, $log, $modalInstance, item) {
        $scope.item = item;
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);