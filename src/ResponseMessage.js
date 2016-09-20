import {Message} from './Message';

export class ResponseMessage extends Message {
    constructor(target, message_type, token, transaction_id, timestamp, result_code) {
        super(target, message_type, token, transaction_id, timestamp);
        this.result_code = result_code;
    }
}
