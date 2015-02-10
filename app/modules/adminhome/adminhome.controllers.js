'use strict';

angular.module('adminhome.controllers', ['blockmarket.services', 'ui.bootstrap'])
    .controller('AdminCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modal', '$log', function ($rootScope, $scope, $q, blockmarketService, $modal, $log) {
        $rootScope.activeView = 'admin'; //sets the style for nav


        $scope.launchModal = function(modalType, itemGuid) {
            $log.log("itemGuid:" + itemGuid);
            switch(modalType) {
                case 'addItem':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/modules/adminhome/partials/addItemModal.tpl.html',
                        controller: 'AddItemCtrl'  ,
                        resolve: {
                            popupTitle: function () {
                                return "Add Item";
                            }
                        }
                    });
                break;

                case 'editItem':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/modules/adminhome/partials/addItemModal.tpl.html',
                        controller: 'EditItemCtrl',
                        resolve: {
                            popupTitle: function () {
                                return "Edit Item";
                            },
                            itemGuid: function () {
                                return itemGuid;
                            }
                        }
                    });
                break;
            }
        }

        blockmarketService.getItemList().then(function(offers) {
            $log.log("all offers: ", offers);
            $scope.items = offers;
        })

    }])
    .controller('AddItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'popupTitle', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, popupTitle) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        $scope.master = {};

        $scope.addItem = function(item) {
            $scope.master = angular.copy(item);

            //format the description object according to the spec
            var description = {
                description: item.description,
                images: [ item.imageURL ],
                EIN: item.ein,
                UPC: item.upc,
                website: item.website,
                item_location: item.location,
                delivery_time: item.deliveryTime,
                ship_method: item.shipMethod,
                condition: item.condition
            };

            var category = [ item.category ];

            item.description = description;
            item.category = category;

            var slashed = addslashes(JSON.stringify(item));

            $log.log("Trying to add item: | " + slashed, item);

            var unslashed = slashed.replace(/\\"/g,'WORDS"');

            $log.log("UNSLASH: " + unslashed);

           // blockmarketService.addItem($rootScope.syscoinAddress, item);
        };

        function addslashes(string) {
            return string.replace(/\\/g, '\\\\').
                replace(/\u0008/g, '\\b').
                replace(/\t/g, '\\t').
                replace(/\n/g, '\\n').
                replace(/\f/g, '\\f').
                replace(/\r/g, '\\r').
                replace(/'/g, '\\\'').
                replace(/"/g, '\\"');
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }])
    .controller('EditItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        blockmarketService.getItem(itemGuid).then(function(item) {
            $scope.item = item;
        });

//        $scope.master = {};
//
//        $scope.addItem = function(item) {
//            $scope.master = angular.copy(item);
//
//            //format the description object according to the spec
//            var description = {
//                description: item.description,
//                images: [ item.imageURL ],
//                EIN: item.ein,
//                UPC: item.upc,
//                website: item.website,
//                item_location: item.location,
//                delivery_time: item.deliveryTime,
//                ship_method: item.shipMethod,
//                condition: item.condition
//            };
//
//            var category = [ item.category ];
//
//            item.description = description;
//            item.category = category;
//
//            $log.log("Trying to add item: | " + escapee(JSON.stringify(item)), item);
//
//            // blockmarketService.addItem($rootScope.syscoinAddress, item);
//        };
//
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);;