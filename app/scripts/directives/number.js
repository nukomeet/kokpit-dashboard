kokpitApp.directive('number', ["Widgets", function(Widgets) {

	return {
		restrict: 'A',
		scope: {
      title: "@",
      moreinfo: "@"
    },
    templateUrl: "views/widgets/number.html",
    link: function(scope, element, attrs, controller ){
    }
  }
}]);