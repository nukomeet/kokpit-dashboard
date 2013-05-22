'use strict';

kokpitApp.controller('MainCtrl', ["$scope", "EventSource", "Widgets", function($scope, EventSource, Widgets) {

  var handleCallback = function (msg) {
    $scope.$apply(function () {
      var data = JSON.parse(msg.data);
      Widgets.receiveData(data.id, data);
    });
  }

  var handleError = function (msg) {}

  var sse = EventSource;

  sse.addEventListener('message', handleCallback, false);
	sse.addEventListener('error', handleError, false);

}]);
