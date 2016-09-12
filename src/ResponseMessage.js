import Message from './Message';

export default class ResponseMessage extends Message {
    constructor(target, result_code) {
        super(target);
        this.result_code = result_code;
    }
}
