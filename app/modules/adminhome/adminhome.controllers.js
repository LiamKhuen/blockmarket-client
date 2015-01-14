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
    .controller('AddItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', 'syscoinService', '$modalInstance', function ($rootScope, $scope, $q, blockmarketService, syscoinService, $modalInstance) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.master = {};

        $scope.addItem = function(item) {
            $scope.master = angular.copy(item);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);