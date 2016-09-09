import getConfigResponse from './TestDevice0.json';
import GetConfigResponse from './GemsMessages';

module.exports = {
    targets: "Tlm0/FrameSync0",
    getConfig: sendGetConfig
};

function sendGetConfig(target) {
    ////////////////////////////////////////////////////////
    // Code to send the message goes here....///////////////
    ////////////////////////////////////////////////////////
    var responseMessage = new GetConfigResponse(target, getConfigResponse.result);

    if (responseMessage.result_code == 'success') {
        responseMessage.parameters = getConfigResponse.targets[target];
    }

    return responseMessage;
}
