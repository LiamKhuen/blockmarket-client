/// <reference path="../typings/index.d.ts" />
'use strict';

class StateConfig {
  constructor($locationProvider:ng.ILocationProvider, $stateProvider:angular.ui.IStateProvider, $urlRouterProvider:angular.ui.IUrlRouterProvider) {
    console.log("config complete");

    //html5 removes the need for # in URL
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
      .state('home', <ng.ui.IState>{
        url: "/",
        templateUrl: "home/home.html",
        controller: "testCtrl"
      })

      .state('view1', <ng.ui.IState>{
        url: "/view1",
        templateUrl: "view1/view1.html",
        controller: "testCtrl"
      });

    $urlRouterProvider.otherwise('/');
  }
}