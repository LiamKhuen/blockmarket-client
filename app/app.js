'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('blockmarket', [
    'ngRoute',
    'home.controllers',
    'allitems.controllers',
    'itemdetail.controllers',
    'global.directives',
    'blockmarket.services',
    'blockmarket.categorylist',
    'adminhome.controllers'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { controller:'HomeCtrl', templateUrl:'app/modules/home/home.tpl.html'});
    $routeProvider.when('/admin', { controller:'AdminHomeCtrl', templateUrl:'app/modules/adminhome/adminhome.tpl.html'});
    $routeProvider.when('/items', { controller:'AllItemsCtrl', templateUrl:'app/modules/allitems/allitems.tpl.html'});
    $routeProvider.when('/item/:guid', { controller:'ItemDetailCtrl', templateUrl:'app/modules/itemdetail/itemdetail.tpl.html'});
    $routeProvider.otherwise({ redirectTo:'/' });
}]).run(['$rootScope', '$log', 'blockmarketService', 'syscoinService', function($rootScope, $log, blockmarketService, syscoinService){
    //fetch all the items
    blockmarketService.getAllItems();

    syscoinService.getAccountAddress("").then(function(response) {
        $log.log("Root address:", response.data.result);
        $rootScope.syscoinAddress = response.data.result;
    });
}]);