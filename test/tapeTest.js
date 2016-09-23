import test from 'tape';
import testDeviceJSONResponse from './TestDevice0.json';
import testSingleTargetResponse from './getSingleTargetResponse.json';
import gems from '../src/index';
import {Message, MessageType} from '../src/Message';
import {Parameter} from '../src/Parameter';
import {ResponseMessage, ResultCode} from '../src/ResponseMessage';
import {GetConfigMessage, GetConfigResponse} from '../src/GemsMessages';
import nock from 'nock';

test('Creating base Message classes', (assert) => {
    var target = 'Sys/TestDevice0';
    var token = '';
    var transaction_id = '';
    var timestamp = '';

    // Create a base message with a bad message type
    var newMessage = new Message(target, 'wrongtype', token, transaction_id, timestamp);
    assert.notEqual(newMessage.message_type, 'wrongtype');

    for (const key of MessageType.enumValues) {
        // key: the name of the object key
        newMessage = new Message(target, key, token, transaction_id, timestamp);
        if (key != 'properties') {
            assert.equal(newMessage.message_type, key);
        }
        var resultCode = 'wrongresultcode';
        newMessage = new ResponseMessage(target, key, token, transaction_id, timestamp, resultCode);
        if (key != 'properties') {
            assert.equal(newMessage.result_code, ResultCode.OTHER);
        }
        resultCode = ResultCode.SUCCESS;
        newMessage = new ResponseMessage(target, key, token, transaction_id, timestamp, resultCode);
        if (key != 'properties') {
            assert.equal(newMessage.result_code, resultCode);
        }
        newMessage = new GetConfigResponse(target, token, transaction_id, timestamp, resultCode);
        if (key != 'properties') {
            assert.equal(newMessage.message_type, MessageType.GET_CONFIG);
            assert.equal(newMessage.parameters, null);
        }
    }

    assert.end();
});

test('Creating get config request and response messages.', (assert) => {
    var target = 'Sys/TestDevice0';
    var token = '';
    var transaction_id = '';
    var timestamp = '';

    // Create a get config request message
    var getConfMsg = new GetConfigMessage(target, token, transaction_id, timestamp);

    getConfMsg.addParameter(new Parameter('TInt', -1));
    getConfMsg.addParameter('TBits');

    assert.ok(getConfMsg.parameters.hasOwnProperty('TInt'));
    assert.ok(getConfMsg.parameters.hasOwnProperty('TBits'));
    assert.end();
});

test('Creating set config send and response messages.', (assert) => {
    var target = 'Sys/TestDevice0';
    var token = '';
    var transaction_id = '';
    var timestamp = '';

    // Create a get config request message
    var setConfMsg = new SetConfigMessage(target, token, transaction_id, timestamp);
    setConfMsg.addParameter(new Parameter('TInt', -1));
    setConfMsg.addParameter('TBits');

    assert.equal(setConfMsg.parameters.length, 2);
    assert.end();
});

test('Creating directive send and response messages.', (assert) => {
    var target = 'Sys/TestDevice0';
    var token = '';
    var transaction_id = '';
    var timestamp = '';

    // Create a get config request message
    var directiveMsg = new DirectiveMessage(target, token, transaction_id, timestamp);
    directiveMsg.addParameter(new Parameter('TInt', -1));
    directiveMsg.addParameter('TBits');

    assert.equal(getConfMsg.parameters.length, 2);
    assert.end();
});

test('Sending a get configuration message', (assert) => {

    var target = 'Sys/TestDevice0';
    var getConfigMessage = new GetConfigMessage(target, '', '', '');

    var api = nock("http://localhost")
        .get("/target/" + getConfigMessage.target)
        .reply(200, testSingleTargetResponse);

    nock("http://localhost")
        .put("/getconfig/")
        .reply(200, testSingleTargetResponse);

    gems.getConfig(getConfigMessage, function(getConfigResponse) {
        assert.deepEqual(testSingleTargetResponse.params, getConfigResponse.parameters);
    });

    getConfigMessage.addParameter('TInt');
    gems.getConfig(getConfigMessage, function(getConfigResponse) {
        assert.deepEqual(testSingleTargetResponse.params, getConfigResponse.parameters);
    });

    assert.end();
})
