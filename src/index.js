import {GetConfigMessage, GetConfigResponse,
        SetConfigMessage, SetConfigResponse,
        DirectiveMessage, DirectiveResponse} from './GemsMessages';
import {ResultCode} from './ResponseMessage';
import http from 'http';

module.exports = {
    getConfig: sendGetConfig,
    setConfig: sendSetConfig,
    directive: sendDirective
};

function sendGetConfig(getConfigMessage, responseHandler) {

    // If the get message has no parameters then just use the simple /get/target/name end point.
    if ( !getConfigMessage.hasParameters() ) {
        var path = '/target/' + getConfigMessage.target;
        http.get({ path:path, responseType:'application/json', method:'GET' }, function(res) {
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

        http.get( {path:path, responseType:'application/json', method:'GET', body:body }, function(res) {
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

function sendSetConfig(setConfigMessage, responseHandler) {

    // If the get message has no parameters then just use the simple /get/target/name end point.
    if ( !setConfigMessage.hasParameters() ) {
        var path = '/target/' + setConfigMessage.target;
        http.get({ path:path, responseType:'application/json', method:'PUT', body:body }, function(res) {
            var responseJSONStr = "";
            res.on("data", function(data) { responseJSONStr += data; });
            res.on("end", function() {
                var gemsJSONResponse = JSON.parse(responseJSONStr);
                var resultCode = ResultCode.enumValueOf(gemsJSONResponse.result.toUpperCase());
                var resultDesc = gemsJSONResponse.description;
                var responseMessage = new SetConfigResponse(setConfigMessage.target, '', '', '', resultCode, resultDesc);
                responseMessage.parameters = gemsJSONResponse.params;
                responseHandler(responseMessage);
            });
        });
    } else {
        // Send a set configuration message for the specified parameters
        var path = '/setconfig/';
        var body = [{"target": setConfigMessage.target, "params": setConfigMessage.getParameterNames()}];

        http.get( {path:path, responseType:'application/json', method:'PUT', body:body }, function(res) {
            var responseJSONStr = "";
            res.on("data", function(data) { responseJSONStr += data; });
            res.on("end", function() {
                var gemsJSONResponse = JSON.parse(responseJSONStr);
                var resultCode = ResultCode.enumValueOf(gemsJSONResponse.result.toUpperCase());
                var resultDesc = gemsJSONResponse.description;
                var responseMessage = new SetConfigResponse(setConfigMessage.target, '', '', '', resultCode, resultDesc);
                responseMessage.parameters = gemsJSONResponse.params;
                responseHandler(responseMessage);
            });
        })
    }
}

function sendDirective(directiveMessage, responseHandler) {

    // Send a directive message for the specified parameters
    var path = '/directive/';
    var body = [{"target": directiveMessage.target, "params": directiveMessage.getParameterNames()}];

    http.get( {path:path, responseType:'application/json', method:'POST', body:body }, function(res) {
        var responseJSONStr = "";
        res.on("data", function(data) { responseJSONStr += data; });
        res.on("end", function() {
            var gemsJSONResponse = JSON.parse(responseJSONStr);
            var resultCode = ResultCode.enumValueOf(gemsJSONResponse.result.toUpperCase());
            var resultDesc = gemsJSONResponse.description;
            var responseMessage = new DirectiveResponse(directiveMessage.target, '', '', '', resultCode, resultDesc);
            responseMessage.parameters = gemsJSONResponse.params;
            responseHandler(responseMessage);
        });
    })
}

