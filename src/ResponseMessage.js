import {Enum} from 'enumify';
import {Message} from './Message';

/**
 * Base class for representing all GEMS response messages.
 */
export class ResponseMessage extends Message {
    /**
     *
     * @param {string} target - The GEMS target name
     * @param {@MessageType} message_type - The GEMS MessageType
     * @param {string} token - The GEMS token. This can be an empty string.
     * @param {string} transaction_id - The client specified GEMS transaction id. Replies will contain the same
     * transaction id.
     * @param {string} timestamp - The GEMS message timestamp.
     * @param {@ResultCode} result_code - The GEMS result code.
     * @param {string} result_description - The GEMS message result description message.
     */
    constructor(target, message_type, token, transaction_id, timestamp, result_code, result_description) {
        super(target, message_type, token, transaction_id, timestamp);
        this.result_code = result_code;
        this.result_description = result_description;

        if ( !(this.result_code instanceof ResultCode) ) {
            console.log("Invalid result_code: " + this.result_code + " defaulting to OTHER.");
            this.result_code = ResultCode.OTHER;
        }
    }
}

/** ResultCode enumeration */
export class ResultCode extends Enum {}
ResultCode.initEnum(
    [
        'SUCCESS',
        'INVALID_RANGE',
        'INVALID_PARAMETER',
        'INVALID_STATE',
        'INVALID_VERSION',
        'INVALID_TARGET',
        'UNSUPPORTED_MESSAGE',
        'MALFORMED_MESSAGE',
        'INTERNAL_ERROR',
        'ACCESS_DENIED',
        'CONFLICTING_PARAMETER',
        'COMMUNICATION_ERROR',
        'OTHER'
    ]
);
