'use strict';

describe('sslModel', function() {
    beforeEach(module('ssl.model'));

    var $injector;

    var ssl = 
        {
            "parameters":{"issuedTo":{"type":"text","value":"Cisco"}},"serialNumber":0,
            "parameters":{"issuedTo":{"type":"text","value":"Google"}},"serialNumber":1
        }
    

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
    }));

    it('should set and get sslModel', function() {
        var sslModel = $injector.get('sslModel');
        
        sslModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssl);
        });

        sslModel.set(ssl);      
    });

    it('should get sslModel if already set', function() {
        var sslModel = $injector.get('sslModel');
        
        sslModel.set(ssl);

        sslModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssl);
        });              
    });
});