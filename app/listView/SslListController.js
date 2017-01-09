'use strict';

angular.module('ssl.listView')

.controller('SslListController', ['listModel', 'uisettings', 'sslValueFilter', 'sslModel', '$location',
function(listModel,uisettings,sslValueFilter,sslModel,$location) {
    var ctrl = this;
    ctrl.sslList = [];

    uisettings.then(function(data) {
		ctrl.fields = data.parameters;
    });

    listModel.get().then(null,null,function(data) {
        ctrl.sslList = data;
    });

    ctrl.display = function(ssl) {
        sslModel.set(ssl);
        $location.path('/ssl');
    }

    ctrl.showTable = function() {
        return (ctrl.sslList && ctrl.sslList.length !== 0);
    }
	    
}]);