'use strict';

angular.module('global.directives', ['blockmarket.services'])
    .directive('holderFix', function () {
        return {
            link: function (scope, element, attrs) {
                Holder.run({ images: element[0], nocss: true });
            }
        };
    });