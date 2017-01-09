'use strict';

describe('SSL value filter', function() {

    beforeEach(module('ssl.sslFilters'));
    var $filter;

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('returns the same string if text type', function() {
        var sslValue = $filter('sslValue');
        expect(sslValue({"type" : "text", "value" : "Sample Text"})).toEqual("Sample Text");
    });

    it('returns formatted date in MM/dd/yyyy if date type', function() {
        var sslValue = $filter('sslValue');
        expect(sslValue({"type" : "date", "value" : "2016-11-30T18:30:00.000Z"})).toEqual("12/01/2016");
    });
});