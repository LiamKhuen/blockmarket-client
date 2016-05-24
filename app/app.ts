/// <reference path="../typings/index.d.ts" />
'use strict';

module App {

  var main = angular.module("blockmarket", ['ui.router']);

  main.config(config);
  main.run(Runner);

  function config($locationProvider: ng.ILocationProvider, $stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {

    //html5 removes the need for # in URL
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider.state('home', <ng.ui.IState>{
      url: "/",
      templateUrl: "view1/view1.html",
      controller: "testCtrl"
    });

    $urlRouterProvider.otherwise('/');
  }

  function Runner(): void {
    console.log("we are up and running");
  }
}
