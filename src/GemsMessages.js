import {Message, MessageType} from './Message'
import {ResponseMessage} from './ResponseMessage'


class RequestMessage extends Message {
    /**
     *
     *
     */
    constructor(target, message_type, token, transaction_id, timestamp) {
        super(target, message_type, token, transaction_id, timestamp);
        this.parameters = {};
        this.gemsParameters = {};
    }
    /**
     * Utility method to quickly add a parameter name for the get config request.
     * @param parameter - Can either be a string or an instance of {@link Parameter}
     */
    addParameter(parameter) {
        if (typeof parameter === "string") {
            this.gemsParameters[parameter] = parameter;
            this.parameters[parameter] = undefined;
        } else {
            this.gemsParameters[parameter.name] = parameter;
            this.parameters[parameter.name] = undefined;
        }
    }
    /**
     * Utility method to determine if any parameter names have been added to the message.
     * @returns {boolean}
     */
    hasParameters() {
        for (var prop in this.parameters) {
            return true;
        }
        return false;
    }

    /**
     * Utility method that will return an array of the parameter names added to the message.
     * @returns {Array}
     */
    getParameterNames() {
        return Object.keys(this.parameters);
    }
}
                

/** GEMS Get config request message class */
export class GetConfigMessage extends RequestMessage {
    /**
     * GEMS get configuration message class. This class either supports an empty get or getting individual
     * parameters from the specified target.
     * @param {string} target - The GEMS target name.
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     */
    constructor(target, token, transaction_id, timestamp) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp);
    }
}


/** GEMS Get config response message class */
export class GetConfigResponse extends ResponseMessage {
    /**
     * Constructor for a get config repsonse. The message type is set to
     * MessageType.GET_CONFIG.
     * @param {string} target - The GEMS target name
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     * @param {@ResultCode} result_code - The GEMS result code.
     * @param {string} result_description - The GEMS message result description message.
     */
    constructor(target, token, transaction_id, timestamp, result_code, result_description) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp, result_code, result_description);
        this.parameters = null;
    }
}

/** GEMS Get config request message class */
export class SetConfigMessage extends Message {
    constructor(target, token, transaction_id, timestamp) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp);
    }
}

/** GEMS Get config response message class */
export class SetConfigResponse extends ResponseMessage {
    /**
     * Constructor for a get config repsonse. The message type is set to
     * MessageType.GET_CONFIG.
     * @param {string} target - The GEMS target name
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     * @param {@ResultCode} result_code - The GEMS result code.
     */
    constructor(target, token, transaction_id, timestamp, result_code) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp, result_code);
        this.parameters = null;
    }
}

/** GEMS Get config request message class */
export class DirectiveMessage extends RequestMessage {
    constructor(target, token, transaction_id, timestamp) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp);
    }
}

/** GEMS Get config response message class */
export class DirectiveResponse extends ResponseMessage {
    /**
     * Constructor for a get config repsonse. The message type is set to
     * MessageType.GET_CONFIG.
     * @param {string} target - The GEMS target name
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     * @param {@ResultCode} result_code - The GEMS result code.
     */
    constructor(target, token, transaction_id, timestamp, result_code) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp, result_code);
        this.parameters = null;
    }
}
