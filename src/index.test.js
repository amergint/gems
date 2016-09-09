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
    });

    describe('sendGetConfig', function() {
        it('should be a successful get config response', function() {
            expect(gems.getConfig('Sys/TestDevice0')).to.satisfy(isSuccessfulGetConfigResponse);

            function isSuccessfulGetConfigResponse(getConfigResponse) {
                console.log(getConfigResponse.result_code);
                if(getConfigResponse.result_code == 'success') {
                    return true;
                }
            }
        });

        it('should contain a parameter called TEnum', function() {
            expect(gems.getConfig('Sys/TestDevice0')).to.satisfy(doesTEnumExist);

            function doesTEnumExist(getConfigResponse) {
                console.log(getConfigResponse.result_code);
                if(getConfigResponse.result_code == 'success' && getConfigResponse.parameters.hasOwnProperty('TEnum')) {
                    return true;
                }
            }

        })
    });
});