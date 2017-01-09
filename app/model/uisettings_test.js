'use strict';

describe('uisettings', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    var settings = {
        "parameters" : [
            {
                "param" : "issuedTo",
                "type" : "text",
                "label" : "Issued To"
            }
        ]
    }

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should request for uisettings when not already available', function() {
        var uisettings = $injector.get('uisettings');
        $httpBackend.when('GET', 'http://localhost:1337/uisettings')
            .respond(settings);

        uisettings.then(function(data) {
            expect(data).toEqual(settings);
        });
        $httpBackend.flush();      
    });

    it('should not request for uisettings when not already available', function() {
        var uisettings = $injector.get('uisettings');
        $httpBackend.when('GET', 'http://localhost:1337/uisettings')
            .respond(settings);

        uisettings.then(function(data) {
            expect(data).toEqual(settings);
        });
        $httpBackend.flush();

        uisettings.then(function(data) {
            expect(data).toEqual(settings);
        });    
    });
});