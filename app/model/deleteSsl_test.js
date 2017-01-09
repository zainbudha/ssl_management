'use strict';

describe('deleteSsl', function() {
    beforeEach(module('ssl.model'));

    var $injector, $httpBackend;

    beforeEach(inject(function(_$injector_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $injector = _$injector_;
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an ssl ', function() {
        var deleteSsl = $injector.get('deleteSsl');
        $httpBackend.expectDELETE('http://localhost:1337/ssl/0')
        .respond(200);
        deleteSsl(0);
        $httpBackend.flush();      
    });
});