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
    controller: function($scope){
      $scope.$on("data", function(scope, data){
      })
    },
    templateUrl: "views/widgets/progress.html",
    compile: function(element, attr){

      $('.knob').knob({
          value: 0,
          min: attr.min,
          max: attr.max
        });
      return {
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