'use strict';

kokpitApp.service('EventSource', function(){
	var sse = new EventSource('/stats');
	return sse;
});
