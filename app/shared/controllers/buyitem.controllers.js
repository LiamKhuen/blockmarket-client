'use strict';

angular.module('adminhome.controllers', ['blockmarket.services', 'angular-syscoin', 'ui.bootstrap'])
    .controller('BuyItemCtrl', ['$rootScope', '$scope', '$log', '$modalInstance', function ($rootScope, $scope, $log, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);