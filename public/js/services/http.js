angular.module('mean.system')
  .factory('HttpService', ['$http', '$rootScope','$location', function (http, $rootScope, $location) {
    var reply = {};

    reply.load = function(params, success, failure) {
        $rootScope.loadingProgress = true;
        if (!angular.isFunction(failure) || failure === undefined)
            failure = reply.failureMessage;
        var sent_headers = { 'Content-Type': 'application/json' };
        if (params.headers == 'form') {
            sent_headers = { 'Content-Type': undefined };
        }
        if (params.headers == 'x-www-form') {
            sent_headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }
        params.data = (params.data === undefined) ? {} : params.data;
        params.method = (params.method === undefined) ? 'POST' : params.method;
        var tokenize = reply.appendToken(params.url, params.method, sent_headers, params.data);
        http
            ({
                method: tokenize.method,
                url: tokenize.url,
                data: tokenize.data,
                headers: tokenize.headers
            }).then(parseSuccessResponse, parseFailureResponse);
        function parseSuccessResponse(response) {
            $rootScope.loadingProgress = false;
            success(response);
        }

        function parseFailureResponse(response) {
            $rootScope.loadingProgress = false;
            failure(response);
        }
    };

    reply.appendToken = function(url, method, headers, data) {
        var api_token = "";
        var return_data = {};

        if (sessionStorage.api_token !== undefined && sessionStorage.api_token !== "undefined") {
            api_token = sessionStorage.api_token;
            headers['access-token'] = api_token;
        }

        switch (headers['Content-Type']) {
            case undefined:
                return_data = data;
                break;
            case 'application/x-www-form-urlencoded':
                return_data = data; //$.param(data);
                break;
            case 'application/json':
                return_data = data;
                break;
        }

        return { 'url': url, 'method': method, 'headers': headers, 'data': return_data };
    };

    return reply;
}]);