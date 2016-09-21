import getConfigResponse from './TestDevice0.json';
import {GetConfigResponse} from './GemsMessages';
import {ResultCode} from './ResponseMessage';
import request from 'request';

module.exports = {
    //targets: "Tlm0/FrameSync0",
    getConfig: sendGetConfig
};

function sendGetConfig(target) {
    ////////////////////////////////////////////////////////
    // Code to send the message goes here....///////////////
    ////////////////////////////////////////////////////////
    var resultCode = ResultCode.enumValueOf(getConfigResponse.result.toUpperCase());
    var responseMessage =
        new GetConfigResponse(target, 'token', 'trans_id', 'timestamp', resultCode);

    if (responseMessage.result_code == ResultCode.SUCCESS) {
        console.log("LUIS!!!");

        responseMessage.parameters = getConfigResponse.targets[target];
    }

    return responseMessage;
}
