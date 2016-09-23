import {GetConfigMessage, GetConfigResponse} from './GemsMessages';
import {ResultCode} from './ResponseMessage';
import http from 'http';

module.exports = {
    //targets: "Tlm0/FrameSync0",
    getConfig: sendGetConfig,
    directive: sendDirective,
    setConfig: sendSetConfig,
};

function sendGetConfig(getConfigMessage, responseHandler) {

    // If the get message has no parameters then just use the simple /get/target/name end point.
    if ( !getConfigMessage.hasParameters() ) {
        var path = '/target/' + getConfigMessage.target;
        http.get({ path:path, responseType:'application/json' }, function(res) {
            var responseJSONStr = "";
            res.on("data", function(data) { responseJSONStr += data; });
            res.on("end", function() {
                var gemsJSONResponse = JSON.parse(responseJSONStr);
                var resultCode = ResultCode.enumValueOf(gemsJSONResponse.result.toUpperCase());
                var resultDesc = gemsJSONResponse.description;
                var responseMessage = new GetConfigResponse(getConfigMessage.target, '', '', '', resultCode, resultDesc);
                responseMessage.parameters = gemsJSONResponse.params;
                responseHandler(responseMessage);
            });
        });
    } else {
        // Send a get configuration message for the specified parameters
        var path = '/getconfig/';
        var body = [{"target": getConfigMessage.target, "params": getConfigMessage.getParameterNames()}];

        http.get( {path:path, responseType:'application/json', method:'PUT', body:body }, function(res) {
            var responseJSONStr = "";
            res.on("data", function(data) { responseJSONStr += data; });
            res.on("end", function() {
                var gemsJSONResponse = JSON.parse(responseJSONStr);
                var resultCode = ResultCode.enumValueOf(gemsJSONResponse.result.toUpperCase());
                var resultDesc = gemsJSONResponse.description;
                var responseMessage = new GetConfigResponse(getConfigMessage.target, '', '', '', resultCode, resultDesc);
                responseMessage.parameters = gemsJSONResponse.params;
                responseHandler(responseMessage);
            });
        })
    }
}

function sendSetConfig(target) {
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

function sendDirective(target) {
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
