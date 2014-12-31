'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('blockmarket', [
    'ngRoute',
    'blockmarket.home.controllers',
    'blockmarket.allitems.controllers',
    'blockmarket.itemdetail.controllers',
    'blockmarket.common.directives',
    'blockmarket.services'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { controller:'HomeCtrl', templateUrl:'app/home/home.tpl.html'});
    $routeProvider.when('/items', { controller:'AllItemsCtrl', templateUrl:'app/allitems/allitems.tpl.html'});
    $routeProvider.when('/item/:guid', { controller:'ItemDetailCtrl', templateUrl:'app/itemdetail/itemdetail.tpl.html'});
    $routeProvider.otherwise({ redirectTo:'/' });
}]);