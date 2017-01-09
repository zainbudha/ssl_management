'use strict';

describe('SSL search component', function() {

    beforeEach(module('ssl.search'));
    var $componentController, $rootScope, $location;
    var uiDeferred, addDeferred;

    var settings;

    beforeEach(inject(function(_$componentController_, $q, _$rootScope_, _$location_) {
        uiDeferred = $q.defer();
        addDeferred = $q.defer();
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        settings = {
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

    it('should set the uisetting into search params', function() {
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise});
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
    });

    it('should call searchModel.search', function() {
        var searchModelMock = jasmine.createSpy('Search Model');
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, searchModel : searchModelMock});
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.searchParams[0].value = "ABC";
        sslSearch.search();
        expect(searchModelMock).toHaveBeenCalledWith(sslSearch.searchParams);
    });

    it('should show error if no search parameter entered', function() {
        var searchModelMock = jasmine.createSpy('Search Model');
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, searchModel : searchModelMock});        
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.search();
        expect(sslSearch.error).toBeTruthy;
        expect(sslSearch.message).toEqual("Please enter at least one search parameter");
        expect(searchModelMock).not.toHaveBeenCalled();
    });

    it('should show error if from is greater than to while searching', function() {
        var searchModelMock = jasmine.createSpy('Search Model');
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, searchModel : searchModelMock});        
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.searchParams[2].value = "12/01/2005"
        sslSearch.searchParams[3].value = "12/01/2004"
        sslSearch.search();
        expect(sslSearch.error).toBeTruthy;
        expect(sslSearch.message).toEqual("From should not be greater than To");
        expect(searchModelMock).not.toHaveBeenCalled();
    });

    it('should add new SSL', function() {
        var addSslMock = {};
        addSslMock.add = function(){return addDeferred.promise;};
        var sslModelMock = {};
        sslModelMock.set = jasmine.createSpy('SSL Model');
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, addSsl : addSslMock, sslModel : sslModelMock});        
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.searchParams[0].value = "Cisco"
        sslSearch.searchParams[1].value = "Infosys"
        sslSearch.searchParams[2].value = "12/01/2004"
        sslSearch.searchParams[3].value = "12/01/2005"
        sslSearch.add();
        addDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslModelMock.set).toHaveBeenCalled();
        expect($location.path()).toEqual('/ssl');
    });

    it('should show error if a field is missing when adding a SSL', function() {
        var addSslMock = {};
        addSslMock.add = function(){return addDeferred.promise;};
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, addSsl : addSslMock});        
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.searchParams[0].value = "Cisco"
        sslSearch.searchParams[1].value = "Infosys"
        sslSearch.searchParams[3].value = "12/01/2005"
        sslSearch.add();
        expect(sslSearch.error).toBeTruthy;
        expect(sslSearch.message).toEqual("Please enter all inputs");
    });

    it('should show error if a from is greater than to when adding a SSL', function() {
        var addSslMock = {};
        addSslMock.add = function(){return addDeferred.promise;};
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, addSsl : addSslMock});        
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.searchParams[0].value = "Cisco"
        sslSearch.searchParams[1].value = "Infosys"
        sslSearch.searchParams[2].value = "12/01/2005"
        sslSearch.searchParams[3].value = "12/01/2004"
        sslSearch.add();
        expect(sslSearch.error).toBeTruthy;
        expect(sslSearch.message).toEqual("From should not be greater than To");
    });

    it('should call searchModel.showAll', function() {
        var sslAllModelMock = jasmine.createSpy('Ssl All Model');
        var sslSearch = $componentController('sslSearch', {uisettings : uiDeferred.promise, sslAllModel : sslAllModelMock});
        uiDeferred.resolve(settings)
        $rootScope.$apply();
        expect(sslSearch.searchParams).toEqual(settings.parameters);
        sslSearch.showAll();
        expect(sslAllModelMock).toHaveBeenCalled();
    });
});