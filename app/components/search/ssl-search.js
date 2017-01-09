'use strict';

function SslSearchController(uisettings, searchModel, sslAllModel, $location, addSsl, sslModel, listModel) {
    var ctrl = this;
    ctrl.error = false;
	uisettings.then(function(data) {
		ctrl.searchParams = data.parameters;
	})

    ctrl.search = function() {
        var parameter;
        var from, to;
        ctrl.error = true;
        ctrl.message = "Please enter at least one search parameter";     
        for(var i=0; i<ctrl.searchParams.length; i++) {
            parameter = ctrl.searchParams[i];
            if(typeof parameter.value !== undefined && parameter.value) {
                ctrl.message = "";
                ctrl.error = false;
                if(parameter.comparator === "from") {
                    from = parameter.value;
                    if(to && (from > to)) {
                        ctrl.message = "From should not be greater than To";
                        ctrl.error = true;
                        break;
                    }
                }
                if(parameter.comparator === "to") {
                    to = parameter.value;
                    if(from && (from > to)) {
                        ctrl.message = "From should not be greater than To";
                        ctrl.error = true;
                        break;
                    }
                }
            }                        
        }
        if(!ctrl.error) {
            $location.path('/sslList');
            searchModel(ctrl.searchParams);
        }      
    }

    ctrl.showAll = function() {
        ctrl.error = false;
        $location.path('/sslList');
        sslAllModel();
    }

    ctrl.add = function() {
        ctrl.message = "";
        var parameter;
        var from, to;
        ctrl.error = false;
        for(var i=0; i<ctrl.searchParams.length; i++) {
            parameter = ctrl.searchParams[i];
            if(typeof parameter.value === undefined || !parameter.value) {
                ctrl.message = "Please enter all inputs";
                ctrl.error = true;
                break;
            }
            if(parameter.comparator === "from") {
                from = parameter.value;
                if(to && (from > to)) {
                    ctrl.message = "From should not be greater than To";
                    ctrl.error = true;
                    break;
                }
            }
            if(parameter.comparator === "to") {
                to = parameter.value;
                if(from && (from > to)) {
                    ctrl.message = "From should not be greater than To";
                    ctrl.error = true;
                    break;
                }
            }            
        }

        if(!ctrl.error) {
            addSsl.add(ctrl.searchParams).then(
                function(data) {
                    listModel.set(null);
                    sslModel.set(data);
                    $location.path('/ssl');
                });
        }        
    }
}

angular.module('ssl.search').component('sslSearch', {
  templateUrl: '/components/search/ssl-search.html',
  controller: SslSearchController
});