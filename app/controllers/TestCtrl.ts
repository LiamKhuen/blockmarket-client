'use strict';

module blockmarket {
  class TestCtrl {
    private todos:any;

    constructor() {
      console.log("TEST");
    }
  }

  angular.module('blockmarket').controller("testCtrl", TestCtrl);
}


