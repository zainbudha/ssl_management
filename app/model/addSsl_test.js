'use strict';

describe('addSsl', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    var params;

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
        params = {
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
            ]
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an ssl ', function() {
        var addSsl = $injector.get('addSsl');
        params.parameters[0].value = "Cisco"
        params.parameters[1].value = "Infosys"
        params.parameters[2].value = "12/01/2004"
        params.parameters[3].value = "12/01/2005"
        $httpBackend.expectPOST('http://localhost:1337/ssl', {"issuedTo":"Cisco","issuedBy":"Infosys","validFrom":"12/01/2004","validTo":"12/01/2005"})
        .respond(200, params.parameters);
        addSsl.add(params.parameters).then(function(data) {
            expect(data).toEqual(params.parameters);
        });
        $httpBackend.flush();      
    });
});