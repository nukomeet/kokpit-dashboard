'use strict';

angularjsSseApp.service('EventSource', function(){
	var sse = new EventSource('/stats');
	return sse;
});
