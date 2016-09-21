import test from 'tape';
import gems from './index';
import {Message, MessageType} from './Message';
import {ResponseMessage, ResultCode} from './ResponseMessage';
import {GetConfigResponse} from './GemsMessages';
//import MessageType from './Message';


test('Creating a base Message class', (assert) => {
    var target = 'Sys/TestDevice0';
    var token = '';
    var transaction_id = '';
    var timestamp = '';
    console.log(Message);
    console.log(MessageType);

    // Create a base message with a bad message type
    var newMessage = new Message(target, 'wrongtype', token, transaction_id, timestamp);
    assert.notEqual(newMessage.message_type, 'wrongtype');

    for (const key of MessageType.enumValues) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        console.log("LUIS: " + key);
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

test('Sending a get configuration message', (assert) => {
    gems.getConfig('Sys/TestDevice0');
    assert.pass('Temporary pass message');
    assert.end();
})