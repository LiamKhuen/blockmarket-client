'use strict';

angular.module('blockmarket.appconfig', [])
    .constant("HOST","http://localhost:8080");

angular.module('blockmarket.marketconstants', [])
    .constant("FEATURED_ITEMS",["cb1abada94a8d3af00", "4d6ef697d31e52e100", "4381f682a211b34c", "48d2f15752ce4e37"])
    .constant("EVENTS", {
        featured_items_loaded: "featured_items_loaded",
        all_items_loaded: "all_items_loaded",
        all_categories_loaded: "all_categories_loaded"
    });