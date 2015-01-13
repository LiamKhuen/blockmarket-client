'use strict';

angular.module('blockmarket.categorylist', ['blockmarket.services'])
    //simple directive for single-tier category list
    .directive('categoryList', function() {
        return {
            restrict: "E",
            scope: {
                categories: "="
            },
            templateUrl: "app/shared/directives/categorylist/categorylist.tpl.html"
        }
    });