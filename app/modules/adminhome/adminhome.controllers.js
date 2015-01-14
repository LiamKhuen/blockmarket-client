'use strict';

angular.module('adminhome.controllers', ['blockmarket.services', 'angular-syscoin', 'ui.bootstrap'])
    .controller('AdminHomeCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', '$modal', function ($rootScope, $scope, $q, blockmarketService, syscoinService, $modal) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.launchModal = function(modalType) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/adminhome/partials/addItemModal.tpl.html',
                controller: 'AddItemCtrl'
            });
        }

    }])
    .controller('AddItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', '$modalInstance', '$log', function ($rootScope, $scope, $q, blockmarketService, syscoinService, $modalInstance, $log) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.master = {};

        $scope.addItem = function(item) {
            $scope.master = angular.copy(item);

            //format the description object according to the spec
            var description = {
                description: item.description,
                images: [ item.imageUrl ],
                EIN: item.ein,
                UPC: item.upc,
                website: item.website,
                item_location: item.location,
                delivery_time: item.deliveryTime,
                ship_method: item.shipMethod,
                condition: item.condition
            };

            var category = [ item.category ];

            item.description = description;
            item.category = category;

            $log.log("Trying to add item:", item);

            blockmarketService.addItem($rootScope.syscoinAddress, item);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);