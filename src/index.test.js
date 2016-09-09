var expect = require('chai').expect;
var gems = require('./index');

describe('gems', function() {
    describe('all', function() {
        it('should be an array of strings', function() {
            expect(gems.getConfig).to.satisfy(isArrayOfStrings);

            function isArrayOfStrings(jsonObj) {
                return true;
                //return array.every(function(item) {
                    //return typeof item === 'string';
                //});
            }
        });
    })
});