angularjsSseApp.directive('number', ["Widgets", "$filter", function(Widgets, $filter) {

	return {
		restrict: 'A',
		scope: {
      name: "@",
      title: "@"
    },
    templateUrl: "views/widgets/number.html",
    link: function(scope, element, attrs, controller ){
      Widgets.add(attrs.name, scope);
      var color = $filter('color');
      element.parent('li').addClass(color).addClass('color');
    }
  }
}]);