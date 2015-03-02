'use strict';

angular.module('blockmarket.appconfig', [])
    .constant("HOST","http://localhost:8080");

angular.module('blockmarket.marketconstants', [])
    .constant("FEATURED_ITEMS",["cb1abada94a8d3af00", "4d6ef697d31e52e100", "4381f682a211b34c", "48d2f15752ce4e37"])
    .constant("BANNED_ITEMS", ["01fad009586507dd00", "7326f26d6a9f3bc800"])
    .constant("EVENTS", {
        featured_items_loaded: "featured_items_loaded",
        all_items_loaded: "all_items_loaded",
        all_categories_loaded: "all_categories_loaded",
        reload_admin: "reload_admin"
    });