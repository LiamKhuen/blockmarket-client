'use strict';

angular.module('blockmarket.allitems.controllers', [])
    .controller('AllItemsCtrl', ['$rootScope', '$scope', '$route', function ($rootScope, $scope, $route) {
        $rootScope.activeView = 'items'; //sets the style for nav


    }]);