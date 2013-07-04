kokpitApp.directive('number', ["Widgets", function(Widgets) {

    return {
      restrict: 'A',
      scope: {
        title: "@",
        moreinfo: "@"
      },
      controller: [ "$scope", function($scope){
        $scope.$on("data", function(scope, data){
        })
    }],
    templateUrl: "views/widgets/number.html",
    link: function(scope, element, attrs, controller ){
    }
  }
}]);