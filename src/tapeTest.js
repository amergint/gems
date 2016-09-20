import test from 'tape';
import gems from './index';
import {Message, MessageType} from './Message';
import {ResponseMessage} from './ResponseMessage';
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

    Object.keys(MessageType).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        console.log(key);
        newMessage = new Message(target, key, token, transaction_id, timestamp);
        if (key != 'properties') {
            assert.equal(newMessage.message_type, key);
        }
        var resultCode = "test";
        newMessage = new ResponseMessage(target, key, token, transaction_id, timestamp, resultCode);
        if (key != 'properties') {
            assert.equal(newMessage.result_code, resultCode);
        }
        newMessage = new GetConfigResponse(target, token, transaction_id, timestamp, resultCode);
        if (key != 'properties') {
            assert.equal(newMessage.message_type, 'GET_CONFIG');
            assert.equal(newMessage.parameters, null);
        }
    });

    assert.end();
});

test('Sending a get configuration message', (assert) => {
    gems.getConfig('Sys/TestDevice0');
    assert.pass('Temporary pass message');
    assert.end();
})