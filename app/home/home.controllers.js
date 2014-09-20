'use strict';

angular.module('blockmarket.home.controllers', [])
    .controller('HomeCtrl', ['$rootScope', '$scope', '$route', function ($rootScope, $scope, $route) {
        $rootScope.activeView = 'home'; //sets the style for nav
    }]);