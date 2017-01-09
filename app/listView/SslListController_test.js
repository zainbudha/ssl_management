'use strict';

describe('SslListController', function() {
    beforeEach(module('ssl.listView'));

    var uiDeferred,listModelDeferred, listModelMock;
    
    var $controller, $rootScope;

    var settings = {
        "parameters" : [
            {
                "param" : "issuedTo",
                "type" : "text",
                "label" : "Issued To"
            }
        ]
    };

    var ssls = [
        {
            "parameters":{"issuedTo":{"type":"text","value":"Cisco"}},"serialNumber":0,
            "parameters":{"issuedTo":{"type":"text","value":"Google"}},"serialNumber":1
        }
    ];

    beforeEach(inject(function(_$controller_, $q, _$rootScope_){
        uiDeferred = $q.defer();
        listModelDeferred = $q.defer();
        listModelMock = {
            set : function(data) {
                if(data) {
                    listModelDeferred.notify(data);
                }            
            },
            get : function() {
                return listModelDeferred.promise;           
            }
        }
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    it('should set the uisettings into fields', function() {
        var sslListController = $controller('SslListController', {uisettings : uiDeferred.promise});
        uiDeferred.resolve(settings);
        $rootScope.$apply();
        expect(sslListController.fields).toEqual(settings.parameters);
    });

    it('should set the listModel into sslList', function() {
        var sslListController = $controller('SslListController', {uisettings : uiDeferred.promise, listModel : listModelMock});
        uiDeferred.resolve(settings);
        listModelMock.set(ssls);
        $rootScope.$apply();
        expect(sslListController.sslList).toEqual(ssls);
    });

    it('should show the table', function() {
        var sslListController = $controller('SslListController', {uisettings : uiDeferred.promise, listModel : listModelMock});
        expect(sslListController.showTable()).toBeFalsy;
        uiDeferred.resolve(settings);
        listModelMock.set(ssls);
        $rootScope.$apply();
        expect(sslListController.sslList).toEqual(ssls);
        expect(sslListController.showTable()).toBeTruthy;
    });
});