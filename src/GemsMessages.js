import {ResponseMessage} from './ResponseMessage'

export class GetConfigResponse extends ResponseMessage {
    constructor(target, token, transaction_id, timestamp, result_code) {
        super(target, 'GET_CONFIG', token, transaction_id, timestamp, result_code);
        this.parameters = null;
    }
}
