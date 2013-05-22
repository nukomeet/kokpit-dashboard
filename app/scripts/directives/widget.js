kokpitApp.directive('widget', ["Widgets", function(Widgets) {

  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {

      scope.updatedAtMessage = function(){
        return new Date();
      }

      element.addClass("widget widget-" + attrs.name);
    },
  }
}]);