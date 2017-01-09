'use strict';

describe('ssl.sslView module', function() {

    beforeEach(module('ssl.sslView'));

    var sslModelMock, sslModelDeferred;
    
    var $controller, $rootScope, $location;
    var ssl;
    

    beforeEach(inject(function(_$controller_, $q, _$rootScope_, _$location_){
        ssl = {
            "parameters" : [
                {
                    "param" : "issuedTo",
                    "type" : "text",
                    "label" : "Issued To"
                },
                {
                    "param" : "issuedBy",
                    "type" : "text",
                    "label" : "Issued By"
                },
                {
                    "param" : "validFrom",
                    "type" : "date",
                    "comparator" : "from",
                    "label" : "Valid From"
                },
                {
                    "param" : "validTo",
                    "type" : "date",
                    "comparator" : "to",
                    "label" : "Valid To"
                }
            ],
            "serialNumber" : 0
        };
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
    }));

    it('should get ssl and set it to scope', function() {
        var sslController = $controller('SslController', {sslModel : sslModelMock});
        sslModelMock.set(ssl);
        $rootScope.$apply();
        expect(sslController.ssl).toEqual(ssl.parameters);
        expect(sslController.serialNumber).toEqual(ssl.serialNumber);
    });

    it('should go back to sslList', function() {
        var sslController = $controller('SslController');
        sslController.back();
        expect($location.path()).toEqual('/sslList');
    });

    it('should go to sslEdit on edit', function() {
        var sslController = $controller('SslController');
        sslController.edit();
        expect($location.path()).toEqual('/sslEdit');
    });

    it('should call delete', function() {
        var deleteSslMock = jasmine.createSpy('Delete SSL');
        var sslController = $controller('SslController', {sslModel : sslModelMock, deleteSsl : deleteSslMock});
        sslModelMock.set(ssl);
        $rootScope.$apply();
        expect(sslController.ssl).toEqual(ssl.parameters);
        expect(sslController.serialNumber).toEqual(ssl.serialNumber);
        
        sslController.delete();
        expect(deleteSslMock).toHaveBeenCalledWith(0);
        expect($location.path()).toEqual('/sslList');
    });
});