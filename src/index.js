import getConfigResponse from './TestDevice0.json';
import {GetConfigResponse} from './GemsMessages';
import request from 'request';

module.exports = {
    //targets: "Tlm0/FrameSync0",
    getConfig: sendGetConfig
};

function sendGetConfig(target) {
    ////////////////////////////////////////////////////////
    // Code to send the message goes here....///////////////
    ////////////////////////////////////////////////////////
    var responseMessage = new GetConfigResponse(target, 'token', 'trans_id', 'timestamp', getConfigResponse.result);

    if (responseMessage.result_code == 'success') {
        console.log("LUIS!!!");

        responseMessage.parameters = getConfigResponse.targets[target];
    }

    return responseMessage;
}
