'use strict';

angular.module('global.directives', ['blockmarket.services'])
    .directive('holderFix', function () {
        return {
            link: function (scope, element, attrs) {
                Holder.run({ images: element[0], nocss: true });
            }
        };
    })

    .directive('targetBlank', function() {
    return {
        compile: function(element) {
            var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
            elems.attr("target", "_blank");
        }
    };
});;