'use strict';

angular.module('blockmarket.appconfig', [])
    .constant("HOST","http://localhost:8080");

angular.module('blockmarket.marketconstants', [])
    .constant("FEATURED_ITEMS",["c1aea8ce078863fd00", "ee118179c78e636e", "34d69723e5bc220a"])
    .constant("EVENTS", {
        featured_items_loaded: "featured_items_loaded",
        all_items_loaded: "all_items_loaded",
        all_categories_loaded: "all_categories_loaded"
    });