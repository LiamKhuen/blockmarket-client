'use strict';

angular.module('itemdetail.controllers', ['blockmarket.services', 'ui.bootstrap', 'adminhome.controllers', 'blockmarket.marketconstants'])
    .controller('ItemDetailCtrl', ['$scope', '$route', '$routeParams', 'blockmarketService', '$log', '$q', '$modal', 'EVENTS', 'BANNED_ITEMS', '$location',
        function ($scope, $route, $routeParams, blockmarketService, $log, $q, $modal, EVENTS, BANNED_ITEMS, $location) {
        $scope.itemDetailActive = true; //sets the style for nav

        $log.log("Getting item details for params: ", $routeParams);

        $scope.categories = blockmarketService.getCategories();

        $scope.$on(EVENTS.all_categories_loaded, function(event, categories) {
            $scope.categories = categories;
        });


        //block banned items
        for(var j = 0; j < BANNED_ITEMS.length; j++) {
            if($routeParams.guid == BANNED_ITEMS[j]) {
                $location.path('/'); //kick to homepage if they try to view a banned item
            }
        }


        blockmarketService.getItem($routeParams.guid).then(function(item) {
            $scope.item = item;
        });

        $scope.buyItem = function() {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/itemdetail/partials/buyItemModal.tpl.html',
                controller: 'BuyItemCtrl',
                resolve:{
                    item: function () {
                        return $scope.item;
                    }
                }
            });
        }
    }])
    .controller('BuyItemCtrl', ['$rootScope', '$scope', '$log', '$modalInstance', '$timeout', 'item', function ($rootScope, $scope, $log, $modalInstance, $timeout, item) {
        $scope.item = item;

        $scope.purchase = {
            itemQuantity: 1,
            buyerEmail: "",
            buyerAddress: "",
            buyerNote: "",
            uri: ""
        }

        $scope.updateURI = function() {
            var notes = "Buyer Email: " + $scope.purchase.buyerEmail + "\n";
            notes += "Shipping Address: " + $scope.purchase.buyerAddress + "\n";
            notes += "Buyer Note: " + $scope.purchase.buyerNote;

            var uri = item.id;

           // alert("FULL URI:" + uri);
            $log.log("Updated URI:" + uri);
            $scope.purchase.uri = uri;
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);