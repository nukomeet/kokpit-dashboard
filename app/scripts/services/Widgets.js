kokpitApp.factory('Widgets', [ function() {
  return {

    collection: {},

    add: function(id, widget){
      this.collection[id] = widget;
    },

    receiveData: function(id, data) {
      var widget = this.collection[id];
      angular.extend(widget, data);

      widget.$broadcast("data", data);
    }
  };
}]);