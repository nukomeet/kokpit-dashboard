angularjsSseApp.directive('number', ["Widgets", "$filter", function(Widgets, $filter) {

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

      var color = $filter('color');
      element.parent('li').addClass(color).addClass('color');
    }
  }
}]);