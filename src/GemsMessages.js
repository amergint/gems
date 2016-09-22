import {Message, MessageType} from './Message'
import {Parameter} from './Parameter'
import {ResponseMessage} from './ResponseMessage'

/** GEMS Get config request message class */
export class GetConfigMessage extends Message {
    /**
     * GEMS get configuration message class. This class either supports an empty get or getting individual
     * parameters from the specified target. Call the addParameter() method to add named parameters that
     * should be requested.
     * @param {string} target - The GEMS target name.
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     */
    constructor(target, token, transaction_id, timestamp) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp);
        this.parameters = {};
        this.gemsParameters = {};
    }

    addParameter(parameter) {
        if (typeof parameter === "string") {
            this.gemsParameters[parameter] = new Parameter(parameter, -1);
            this.parameters[parameter] = undefined;
        } else {
            this.gemsParameters[parameter.name] = parameter;
            this.parameters[parameter.name] = undefined;
        }
    }

    hasParameters() {
        for (var prop in this.parameters) {
            return true;
        }
        return false;
    }

    getParameterNames() {
        return Object.keys(this.parameters);
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
