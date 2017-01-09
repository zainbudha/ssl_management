'use strict';

angular.module('ssl.sslEdit')

.controller('SslEditController', ['sslModel', '$location', 'editSsl', 'listModel',
function(sslModel, $location, editSsl, listModel) {
    var ctrl = this;
    ctrl.error = false;

    sslModel.get().then(null,null,function(data) {
        ctrl.error = false;
        ctrl.ssl = data.parameters;
        ctrl.serialNumber = data.serialNumber;
        
        angular.forEach(ctrl.ssl, function(value, key) {
            if(value.type === 'date') {
                value.value = new Date(value.value);
            }
        });
    });

    ctrl.back = function() {
        ctrl.error = false;
        $location.path('/ssl');
    }

    ctrl.submit = function() {
        ctrl.message = "";
        ctrl.error = false;
        angular.forEach(ctrl.ssl, function(value, key) {
            if(typeof value.value === undefined || !value.value) {
                ctrl.message = "Please enter all inputs";
                ctrl.error = true;
            }      
        });
        if(!ctrl.error) {
            editSsl.edit(ctrl.ssl, ctrl.serialNumber).then(
            function(data) {
                listModel.set(null);
                sslModel.set(data);
                $location.path('/ssl');
            });
        }
        
    }
}]);