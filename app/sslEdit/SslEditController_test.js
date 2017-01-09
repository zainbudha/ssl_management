'use strict';

describe('SSL edit', function() {

    beforeEach(module('ssl.sslEdit'));
    var sslModelMock, sslModelDeferred, ssl;
    var $controller, $rootScope, $location;
    var editDeferred;

    beforeEach(inject(function(_$controller_, $q, _$rootScope_, _$location_) {
        editDeferred = $q.defer();
        sslModelDeferred = $q.defer();
        sslModelMock = {
            set : function(data) {
                if(data) {
                    sslModelDeferred.notify(data);
                }            
            },
            get : function() {
                return sslModelDeferred.promise;           
            }
        }
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        ssl = {
            parameters : {
                "issuedTo" : {
                    "type" : "text",
                    "label" : "Issued To"
                },
                "issuedBy": {
                    "type" : "text",
                    "label" : "Issued By"
                },
                "validFrom": {
                    "type" : "date",
                    "comparator" : "from",
                    "label" : "Valid From"
                },
                "validTo": {
                    "type" : "date",
                    "comparator" : "to",
                    "label" : "Valid To"
                }
            },
            "serialNumber" : 0
        };
    }));

    it('should get ssl and set it to scope', function() {
        var sslEditController = $controller('SslEditController', {sslModel : sslModelMock});
        sslModelMock.set(ssl);
        $rootScope.$apply();
        expect(sslEditController.ssl).toEqual(ssl.parameters);
        expect(sslEditController.serialNumber).toEqual(ssl.serialNumber);
        expect(sslEditController.error).toBeFalsy;
    });

    it('should go back to ssl', function() {
        var sslEditController = $controller('SslEditController');
        sslEditController.back();
        expect($location.path()).toEqual('/ssl');
    });

    it('should edit an SSL', function() {
        var editSslMock = {};
        editSslMock.edit = function(){return editDeferred.promise;};
        var sslEditController = $controller('SslEditController', {sslModel : sslModelMock, editSsl : editSslMock});
        
        sslModelMock.set(ssl);
        $rootScope.$apply();
        expect(sslEditController.ssl).toEqual(ssl.parameters);
        expect(sslEditController.serialNumber).toEqual(ssl.serialNumber);
        expect(sslEditController.error).toBeFalsy;
        sslEditController.ssl.issuedTo.value = "Cisco"
        sslEditController.ssl.issuedBy.value = "Infosys"
        sslEditController.ssl.validFrom.value = "12/01/2004"
        sslEditController.ssl.validTo.value = "12/01/2005"
        sslEditController.submit();
        editDeferred.resolve(ssl);
        $rootScope.$apply();
        expect($location.path()).toEqual('/ssl');
        expect(sslEditController.error).toBeFalsy;
    });

    it('should show error if a filed in missing while editing an SSL', function() {
        var editSslMock = {};
        editSslMock.edit = function(){return editDeferred.promise;};
        var sslEditController = $controller('SslEditController', {sslModel : sslModelMock, editSsl : editSslMock});
        
        sslModelMock.set(ssl);
        $rootScope.$apply();
        expect(sslEditController.ssl).toEqual(ssl.parameters);
        expect(sslEditController.serialNumber).toEqual(ssl.serialNumber);
        expect(sslEditController.error).toBeFalsy;

        sslEditController.ssl.issuedTo.value = "Cisco"
        sslEditController.ssl.validFrom.value = "12/01/2004"
        sslEditController.ssl.validTo.value = "12/01/2005"
        sslEditController.submit();

        expect(sslEditController.error).toBeTruthy;
        expect(sslEditController.message).toEqual("Please enter all inputs");
    });
});