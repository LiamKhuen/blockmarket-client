'use strict';

angular.module('itemdetail.controllers', [])
    .controller('ItemDetailCtrl', ['$scope', '$route', function ($scope, $route) {
        $scope.itemDetailActive = true; //sets the style for nav
    }]);