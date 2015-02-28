'use strict';

angular.module('adminhome.controllers', ['blockmarket.services', 'ui.bootstrap'])
    .controller('AdminCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modal', '$log', function ($rootScope, $scope, $q, blockmarketService, $modal, $log) {
        $rootScope.activeView = 'admin'; //sets the style for nav
        $scope.showAlert = false;
        $scope.alert = null;

        function hasActiveItems() {
            for(var i = 0; i < $scope.items.length; i++) {
                if(parseInt($scope.items[i].expires_in) > 0) {
                    return true;
                }
            }

            return false;
        }

        function hasExpiredItems() {
            for(var i = 0; i < $scope.items.length; i++) {
                if(parseInt($scope.items[i].expires_in) < 0) {
                    return true;
                }
            }

            return false;
        }

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

                case 'renewItem':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/modules/adminhome/partials/renewItemModal.tpl.html',
                        controller: 'RenewItemCtrl'  ,
                        resolve: {
                            itemGuid: function () {
                                return itemGuid;
                            },
                            popupTitle: function () {
                                return "Renew Item";
                            }
                        },
                        scope: $scope
                    });
                break;

                case 'editItem':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/modules/adminhome/partials/editItemModal.tpl.html',
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

        $scope.showExpiredItems = false;
        $scope.toggleExpiredItems = function() {
            $scope.showExpiredItems = !$scope.showExpiredItems;
        }

        blockmarketService.getItemList().then(function(offers) {
            $log.log("all offers: ", offers);
            $scope.items = offers;
            $scope.hasExpiredItems = hasExpiredItems();
            $scope.hasActiveItems = hasActiveItems();
        })

    }])
    .controller('AddItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'popupTitle', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, popupTitle) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        $scope.master = {};

        $scope.addItem = function(item) {
            $scope.master = angular.copy(item);

            //format the description object according to the spec
            var offer = {
                quantity: item.quantity,
                price: item.price,
                title: item.title,
                description: {
                    description: item.description.description,
                    images: (item.description.images != undefined && item.description.images.length > 0) ? [ item.description.images[0] ] : [],
                    EIN: item.description.EIN,
                    UPC: item.description.UPC,
                    website: item.description.website,
                    item_location: item.description.item_location,
                    delivery_time: item.description.delivery_time,
                    ship_method: item.description.ship_method,
                    condition: item.description.condition
                },

                category: (item.category != undefined && item.category.length > 0) ? [ item.category[0] ] : []
            };

            $log.log("OFFER:", offer);

            blockmarketService.addItem($rootScope.syscoinAddress, item).then(function(response) {
                alert("Item Successfully Added! Please allow one confirmation for the item to be reflected in the table. Until its confirmed it will display as expired.");
                $modalInstance.dismiss('cancel');
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }])
    .controller('RenewItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        $scope.master = {};

        blockmarketService.getItem(itemGuid).then(function(item) {
            $scope.item = item;
        });

        $scope.renewItem = function(item) {
            $scope.master = angular.copy(item);
            $log.log("Renewing item: ", item);
            blockmarketService.renewItem(item.id).then(function(item) {
                alert("Item Successfully Renewed! Please allow one confirmation for the new expiry to be reflected in the table.");
                $modalInstance.dismiss('cancel');
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.closeAlert = function() {
            $scope.showAlert = false;
        }
    }])
    .controller('EditItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        blockmarketService.getItem(itemGuid).then(function(item) {
            $scope.item = item;
        });

        $scope.master = {};

        $scope.updateItem = function(item) {
            $scope.master = angular.copy(item);

            //format the description object according to the spec
            var offer = {
                quantity: item.quantity,
                price: item.price,
                title: item.title,
                description: {
                    description: item.description.description,
                    images: (item.description.images != undefined && item.description.images.length > 0) ? [ item.description.images[0] ] : [],
                    EIN: item.description.EIN,
                    UPC: item.description.UPC,
                    website: item.description.website,
                    item_location: item.description.item_location,
                    delivery_time: item.description.delivery_time,
                    ship_method: item.description.ship_method,
                    condition: item.description.condition
                },

                category: (item.category != undefined && item.category.length > 0) ? [ item.category[0] ] : []
            };

            $log.log("Trying to edit item:", offer);

            blockmarketService.updateItem(item).then(function(response) {
                $log.log("Response of update:", response);
                alert("Item Successfully Updated! Please allow one confirmation for the edits to be reflected in the table.");
                $modalInstance.dismiss('cancel');
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }]);