kokpitApp.directive('number', ["Widgets", function(Widgets) {

	return {
		restrict: 'A',
		scope: {
      name: "@",
      title: "@",
      moreinfo: "@"
    },
    templateUrl: "views/widgets/number.html",
    link: function(scope, element, attrs, controller ){

      scope.updatedAtMessage = function(){
        return new Date();
      }

      Widgets.add(attrs.name, scope);
    }
  }
}]);