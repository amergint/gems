import test from 'tape';
import gems from './index';

test('A passing test', (assert) => {
    assert.pass('This test will pass.');
    var gemsResponse = gems.getConfig('Sys/TestDevice0');
    console.log(gemsResponse);

    assert.end();
});