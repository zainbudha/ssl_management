'use strict';

angular.module('ssl.sslView')

.controller('SslController', ['sslModel', 'deleteSsl', '$location', 'listModel',
function(sslModel, deleteSsl, $location, listModel) {
    var ctrl = this;

    sslModel.get().then(null,null,function(data) {
        ctrl.ssl = data.parameters;
        ctrl.serialNumber = data.serialNumber;
    });

    ctrl.back = function() {
        $location.path('/sslList');
    }

    ctrl.edit = function() {
        $location.path('/sslEdit');
    }

    ctrl.delete = function() {
        deleteSsl(ctrl.serialNumber);
        $location.path('/sslList');
        listModel.set(null);
    }
}]);