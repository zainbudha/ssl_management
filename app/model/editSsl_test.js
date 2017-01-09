'use strict';

describe('editSsl', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    var params;

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
        params = {
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

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an ssl ', function() {
        var editSsl = $injector.get('editSsl');
        params.parameters["issuedTo"].value = "Cisco"
        params.parameters["issuedBy"].value = "Infosys"
        params.parameters["validFrom"].value = "12/01/2004"
        params.parameters["validTo"].value = "12/01/2005"
        $httpBackend.expectPUT('http://localhost:1337/ssl/0', {"issuedTo":"Cisco","issuedBy":"Infosys","validFrom":"12/01/2004","validTo":"12/01/2005"})
        .respond(200, params.parameters);
        editSsl.edit(params.parameters, 0).then(function(data) {
            expect(data).toEqual(params.parameters);
        });
        $httpBackend.flush();      
    });
});