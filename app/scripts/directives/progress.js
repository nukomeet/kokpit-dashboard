kokpitApp.directive('progress', ["Widgets", function(Widgets) {

  return {
    restrict: 'A',
    scope: {
      name: "@",
      title: "@",
      min: "@",
      max: "@",
      moreinfo: "@"
    },
    templateUrl: "views/widgets/progress.html",
    compile: function(element, attr){

      $('.knob').knob({
          value: 0,
          min: attr.min,
          max: attr.max
        });
      return {
        pre: function(scope, element, attrs, controller){
          scope.updatedAtMessage = function(){
            return new Date();
          }

          Widgets.add(attrs.name, scope);
        },
        post: function(scope, element, attrs, controller ){
          scope.$watch('value', function(value){
            if(value){
              $('.knob').val(value).trigger('change');
            }
          })
        }
      }
    }
  }
}]);