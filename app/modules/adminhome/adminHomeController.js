'use strict';

function hasRequiredFields(item) {

    console.log("item for verfiication:", item);

    if(item.title == "" || item.title == undefined) {
        return "Must specify a name.";
    }

    if(item.quantity == "" || item.quantity == undefined) {
        return "Must specify a quantity.";
    }

    if(item.price == "" || item.price == undefined) {
        return "Must specify a price.";
    }

    if(item.category.length == 0 || item.category == undefined) {
        return "Must specify a category.";
    }

    if(item.description.description == "" || item.description.description == undefined)  {
        return "Must specify a description.";
    }

    if(item.description.images.length == 0 || item.description.images == undefined)  {
        return "Must specify an image.";
    }

    return "";
}

angular.module('adminhome.controllers', ['blockmarket.services', 'ui.bootstrap', 'blockmarket.marketconstants'])
    .controller('AdminCtrl', ['$rootScope', '$scope', '$q', '$cookies', 'blockmarketService', '$modal', '$log', 'EVENTS', 'syscoinAPIService',
        function ($rootScope, $scope, $q, $cookies, blockmarketService, $modal, $log, EVENTS, syscoinAPIService) {

        $rootScope.activeView = 'admin'; //sets the style for nav
        $scope.user = {username: "", password: ""};
        $scope.balance = 0;


        function hasActiveItems() {
            for(var i = 0; i < $scope.items.length; i++) {
                if($scope.items[i].expired == 0 && $scope.items[i].pending == 0) {
                    return true;
                }
            }

            return false;
        }

        function hasPendingItems() {
            for(var i = 0; i < $scope.items.length; i++) {
                if($scope.items[i].expired == 0 && $scope.items[i].pending == 1) {
                    return true;
                }
            }

            return false;
        }

        function hasExpiredItems() {
            for(var i = 0; i < $scope.items.length; i++) {
                if($scope.items[i].expired == 1) {
                    return true;
                }
            }

            return false;
        }

        $scope.authenticated = $rootScope.authenticated = $cookies.authenticated;
        $scope.authFailed = false;
        $scope.authenticate = function(user) {
            syscoinAPIService.authenticate(user.username, user.password).then(function(response) {
                $log.log("Auth result: ", response);
                $cookies.authenticated = true;
                $scope.authenticated = response.data.authenticated === true;
                if($scope.authenticated !== true) {
                    $scope.authFailed = true;
                }else{
                    $scope.authFailed = false;
                }
            });
        }

        $scope.launchModal = function(modalType, itemGuid, recreateItem) {
            $log.log("itemGuid:" + itemGuid);
            switch(modalType) {
                case 'addItem':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/modules/adminhome/partials/addItemModal.tpl.html',
                        controller: 'AddItemCtrl'  ,
                        resolve: {
                            popupTitle: function () {
                                return "Add Item";
                            },
                            itemGuid: function () { //if we're recreating an item, pass back the guid to recreate from
                                return recreateItem ? itemGuid : null;
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

        function reloadItems() {
            blockmarketService.getItemList().then(function(offers) {
                $log.log("all offers: ", offers);
                $scope.items = offers;
                $scope.hasExpiredItems = hasExpiredItems();
                $scope.hasActiveItems = hasActiveItems();
                $scope.hasPendingItems = hasPendingItems();

                syscoinAPIService.getInfo().then(function(response) {
                    $scope.balance = response.data.balance;
                });
            });
        }

        reloadItems();

        $rootScope.$on(EVENTS.reload_admin, function(){
            $log.log("Reload Items event.");
            reloadItems();
        })

    }])
    .controller('AddItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle','EVENTS', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle, EVENTS) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        if(itemGuid != null) {
            blockmarketService.getItem(itemGuid).then(function(item) {
                $scope.item = item;
            });
        }

        $scope.master = {};

        $scope.addItem = function(item) {
            $scope.master = angular.copy(item)
            $log.log("adding:", item);

            //format the description object according to the spec
            var offer = blockmarketService.formatItem(item.title, item.category, item.quantity, item.price, item.description.description,
                item.description.images, item.description.EIN, item.description.UPC, item.description.website, item.description.deliveryMethod,
                item.description.location, item.description.deliveryTime, item.description.shipMethod, item.description.condition);

            $log.log("ADDING:", offer);

            if(hasRequiredFields(offer) == "") {
                $log.log("OFFER:", offer);

                blockmarketService.addItem($rootScope.syscoinAddress, offer).then(function(response) {
                    alert("Item Successfully Added! Please allow one confirmation for the item to be reflected in the table. Until its confirmed it will display as expired.");
                    $modalInstance.dismiss('cancel');
                    $rootScope.$broadcast(EVENTS.reload_admin);
                });
            }else{
                alert(hasRequiredFields(offer));
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }])
    .controller('EditItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle', 'EVENTS', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle, EVENTS) {
        $rootScope.activeView = 'admin'; //sets the style for nav

        $scope.title = popupTitle;

        blockmarketService.getItem(itemGuid).then(function(item) {
            $scope.item = item;
        });

        $scope.master = {};

        $scope.updateItem = function(item) {
            $scope.master = angular.copy(item);

            //format the description object according to the spec
            var offer = blockmarketService.formatItem(item.title, item.category, item.quantity, item.price, item.description.description,
                item.description.images, item.description.EIN, item.description.UPC, item.description.website, item.description.deliveryMethod,
                item.description.itemLocation, item.description.deliveryTime, item.description.shipMethod, item.description.condition);

            if(hasRequiredFields(offer) == "") {
                $log.log("Trying to edit item:", offer);

                blockmarketService.updateItem(item).then(function(response) {
                    $log.log("Response of update:", response);
                    alert("Item Successfully Updated! Please allow one confirmation for the edits to be reflected in the table.");
                    $modalInstance.dismiss('cancel');
                    $rootScope.$broadcast(EVENTS.reload_admin);
                });
            }else{
                alert(hasRequiredFields(offer));
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    }])
    .controller('RenewItemCtrl', ['$rootScope', '$scope', '$q', 'blockmarketService', '$modalInstance', '$log', 'itemGuid', 'popupTitle', 'EVENTS', function ($rootScope, $scope, $q, blockmarketService, $modalInstance, $log, itemGuid, popupTitle, EVENTS) {
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
                $rootScope.$broadcast(EVENTS.reload_admin);
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.closeAlert = function() {
            $scope.showAlert = false;
        }
    }]);
