'use strict';

describe('listModel', function() {
    beforeEach(module('ssl.model'));

    var $injector;

    var ssls = [
        {
            "parameters":{"issuedTo":{"type":"text","value":"Cisco"}},"serialNumber":0,
            "parameters":{"issuedTo":{"type":"text","value":"Google"}},"serialNumber":1
        }
    ]

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
    }));

    it('should set and get listModel', function() {
        var listModel = $injector.get('listModel');
        
        listModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssls);
        });

        listModel.set(ssls);      
    });

    it('should get listModel if already set', function() {
        var listModel = $injector.get('listModel');
        
        listModel.set(ssls);

        listModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssls);
        });              
    });
});