import test from 'tape';
import testDeviceJSONResponse from './TestDevice0.json';
import testGetSingleTargetResponse from './getSingleTargetResponse.json';
import testSetSingleTargetResponse from './TestDeviceSetConfig.json';
import testDirectiveSingleTargetResponse from './TestDeviceMethod.json';
import testDirectiveSingleTargetResponseNoParam from './TestDeviceMethodNoParams.json';
import gems from '../src/index';
import {Message, MessageType} from '../src/Message';
import {Parameter} from '../src/Parameter';
import {ResponseMessage, ResultCode} from '../src/ResponseMessage';
import {GetConfigMessage, GetConfigResponse,
        SetConfigMessage, SetConfigResponse,
        DirectiveMessage, DirectiveResponse} from '../src/GemsMessages';
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

    assert.ok(setConfMsg.parameters.hasOwnProperty('TInt'));
    assert.ok(setConfMsg.parameters.hasOwnProperty('TBits'));
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

    assert.ok(directiveMsg.parameters.hasOwnProperty('TInt'));
    assert.ok(directiveMsg.parameters.hasOwnProperty('TBits'));
    assert.end();
});

test('Sending a get configuration message', (assert) => {

    var target = 'Sys/TestDevice0';
    var getConfigMessage = new GetConfigMessage(target, '', '', '');

    var api = nock("http://localhost")
        .get("/target/" + getConfigMessage.target)
        .reply(200, testGetSingleTargetResponse);

    nock("http://localhost")
        .get("/getconfig/")
        .reply(200, testGetSingleTargetResponse);

    console.log("With no parameters")
    gems.getConfig(getConfigMessage, function(getConfigResponse) {
        assert.deepEqual(testGetSingleTargetResponse.params, getConfigResponse.parameters);
    });
    
    console.log("With parameters");
    getConfigMessage.addParameter('TInt');
    gems.getConfig(getConfigMessage, function(getConfigResponse) {
        assert.deepEqual(testGetSingleTargetResponse.params, getConfigResponse.parameters);
    });

    assert.end();
})

test('Sending a set configuration message', (assert) => {

    var target = 'Sys/TestDevice0';
    var setConfigMessage = new SetConfigMessage(target, '', '', '');

    var api = nock("http://localhost")
        .put("/target/" + setConfigMessage.target)
        .reply(200, testSetSingleTargetResponse);

    nock("http://localhost")
        .put("/setconfig/")
        .reply(200, testSetSingleTargetResponse);

    gems.setConfig(setConfigMessage, function(setConfigResponse) {
        assert.deepEqual(testSetSingleTargetResponse.params, setConfigResponse.parameters);
    });

    setConfigMessage.addParameter('TInt');
    gems.setConfig(setConfigMessage, function(setConfigResponse) {
        assert.deepEqual(testSetSingleTargetResponse.params, setConfigResponse.parameters);
    });

    assert.end();
})

test('Sending a directive configuration message', (assert) => {

    var target = 'Sys/TestDevice0';
    var directiveMessage = new DirectiveMessage(target, '', '', '');

    var api = nock("http://localhost")
        .post("/target/" + directiveMessage.target)
        .reply(200, testDirectiveSingleTargetResponse);

    nock("http://localhost")
        .post("/directive/")
        .reply(200, testDirectiveSingleTargetResponse);

    directiveMessage.addParameter('TInt:15');
    gems.directive(directiveMessage, function(directiveResponse) {
        assert.deepEqual(testDirectiveSingleTargetResponse.params, directiveResponse.parameters);
    });

    assert.end();
})
