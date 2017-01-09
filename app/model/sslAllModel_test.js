'use strict';

describe('sslAllModel', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    var ssls = [
        {
            "parameters":{"issuedTo":{"type":"text","value":"Cisco"}},"serialNumber":0,
            "parameters":{"issuedTo":{"type":"text","value":"Google"}},"serialNumber":1
        }
    ]

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should request for all ssls ', function() {
        var sslAllModel = $injector.get('sslAllModel');
        var listModel = $injector.get('listModel');
        $httpBackend.when('GET', 'http://localhost:1337/ssls')
            .respond(ssls);

        listModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssls);
        });
        sslAllModel();
        $httpBackend.flush();      
    });
});