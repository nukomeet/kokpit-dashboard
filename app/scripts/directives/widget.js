kokpitApp.directive('widget', ["Widgets", function(Widgets) {

  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      Widgets.add(attrs.name, scope);
      element.addClass("widget widget-" + attrs.name);
    },
  }
}]);