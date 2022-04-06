export const globalAPI = (requestType, apiEndpoint, data, successCallback, failCallback) => {

    let request = new XMLHttpRequest();

    if(!requestType) {
        requestType = 'GET';
    }

    if(!data){
        data = null;
    }

    request.open(requestType, 'http://dev.plantdiary.com/api/'+apiEndpoint, true);

    if(requestType == 'POST'){
        const csrf = document.getElementById('csrf').getAttribute('content');
        request.setRequestHeader('X-CSRF-TOKEN', csrf);
    } else {
        request.setRequestHeader('Content-Type', 'application/json');
    }

    request.onload = function () {
        if(request.status >= 200) {
            let resultData = JSON.parse(request.response);

            if(successCallback){
                successCallback(resultData, request);
            }
        } else {
            if(failCallback){
                failCallback(request);
            }
        }
    }
    request.send(data);    
}