import ResponseMessage from './ResponseMessage'

export default class GetConfigResponse extends ResponseMessage {
    constructor(target, result_code) {
        super(target, result_code);
        this.parameters = null;
    }
}
