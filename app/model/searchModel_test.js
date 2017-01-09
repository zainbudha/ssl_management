'use strict';

describe('searchModel', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    var ssls = [
        {
            "parameters":{"issuedTo":{"type":"text","value":"Cisco"},"issuedBy":{"type":"text","value":"Infosys"}},"serialNumber":0
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
        var searchModel = $injector.get('searchModel');
        var listModel = $injector.get('listModel');
        $httpBackend.when('GET', 'http://localhost:1337/search?issuedTo=Cisco&issuedBy=Infosys')
            .respond(ssls);

        listModel.get().then(null,null,function(data) {
            expect(data).toEqual(ssls);
        });
        searchModel([{"param" : "issuedTo", "value" : "Cisco"},{"param" : "issuedBy", "value" : "Infosys"}]);
        $httpBackend.flush();      
    });
});