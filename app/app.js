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
.config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
    $routeProvider.when('/', { controller:'HomeCtrl', templateUrl:'app/modules/home/home.tpl.html'});
    $routeProvider.when('/admin', { controller:'AdminCtrl', templateUrl:'app/modules/adminhome/adminhome.tpl.html'});
    $routeProvider.when('/items', { controller:'AllItemsCtrl', templateUrl:'app/modules/allitems/allitems.tpl.html'});
    $routeProvider.when('/item/:guid', { controller:'ItemDetailCtrl', templateUrl:'app/modules/itemdetail/itemdetail.tpl.html'});
    $routeProvider.otherwise({ redirectTo:'/' });

    //from: http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|blob|ftp|mailto|c‌​hrome-extension|syscoin):/);
    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
}]).run(['$rootScope', '$log', 'blockmarketService', 'syscoinAPIService',
        function($rootScope, $log, blockmarketService, syscoinAPIService, $cookies){

    $rootScope.authenticated = false;

    syscoinAPIService.getAccountAddress("").then(function(response) {
        $log.log("Root address:", response.data);
        $rootScope.syscoinAddress = response.data;
    });

    syscoinAPIService.getInfo().then(function(response) {
        $log.log("Root info:", response.data);
        $rootScope.currentBlocks = response.data.blocks;
    });
}]);