'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('blockmarket', [
    'ngRoute',
    'adminhome.controllers',
    'home.controllers',
    'allitems.controllers',
    'itemdetail.controllers',
    'global.directives',
    'blockmarket.services',
    'blockmarket.categorylist'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { controller:'HomeCtrl', templateUrl:'app/modules/home/home.tpl.html'});
    $routeProvider.when('/admin', { controller:'AdminCtrl', templateUrl:'app/modules/adminhome/adminhome.tpl.html'});
    $routeProvider.when('/items', { controller:'AllItemsCtrl', templateUrl:'app/modules/allitems/allitems.tpl.html'});
    $routeProvider.when('/item/:guid', { controller:'ItemDetailCtrl', templateUrl:'app/modules/itemdetail/itemdetail.tpl.html'});
    $routeProvider.otherwise({ redirectTo:'/' });
}]).run(['$rootScope', '$log', 'blockmarketService', 'syscoinAPIService', function($rootScope, $log, blockmarketService, syscoinAPIService){

    syscoinAPIService.getAccountAddress("").then(function(response) {
        $log.log("Root address:", response.data);
        $rootScope.syscoinAddress = response.data;
    });
}]);