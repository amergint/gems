import {MessageType} from './Message'
import {ResponseMessage} from './ResponseMessage'

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
     */
    constructor(target, token, transaction_id, timestamp, result_code) {
        super(target, MessageType.GET_CONFIG, token, transaction_id, timestamp, result_code);
        this.parameters = null;
    }
}
