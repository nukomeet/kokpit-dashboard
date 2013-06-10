'use strict';

kokpitApp.service('EventSource', function(){
    var sse = new EventSource('/sse');
    return sse;
});
