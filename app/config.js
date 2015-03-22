'use strict';

angular.module('blockmarket.appconfig', [])
    .constant("APP_CONFIG", {
            VERSION: "0.1b3"
    });

angular.module('blockmarket.marketconstants', [])
    .constant("FEATURED_ITEMS",["d0b05311b7fd5953"])
    .constant("BANNED_ITEMS", ["01fad009586507dd00", "7326f26d6a9f3bc800"])
    .constant("EVENTS", {
        featured_items_loaded: "featured_items_loaded",
        all_items_loaded: "all_items_loaded",
        all_categories_loaded: "all_categories_loaded",
        reload_admin: "reload_admin"
    });