import {Enum} from 'enumify';

/** Base class for representing all gems messages. */
export class Message {
    /**
     * Create a base GEMS message
     * @param {string} target - The GEMS target name
     * @param {@MessageType} message_type - The GEMS MessageType
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     */
    constructor(target, message_type, token, transaction_id, timestamp) {
        this.target = target;
        this.token = token;
        this.message_type = message_type;
        this.gems_version = "1.5";
        this.transaction_id = transaction_id;
        this.timestamp = timestamp;

        // Test if this is a valid message type
        console.log("LOG ENUM TYPE:");
        console.log(this.message_type);
        if ( !(this.message_type instanceof MessageType) ) {
            console.log("Invalid message type: " + this.message_type + " Defaulting to GET_CONFIG");
            this.message_type = MessageType.GET_CONFIG;
        }
    }
}

export class MessageType extends Enum {}
MessageType.initEnum(['GET_CONFIG', 'SET_CONFIG']);
