angularjsSseApp.factory('Widgets', [ function() {
  return {

    collection: {},

    add: function(id, widget){
      this.collection[id] = widget;
    },

    receiveData: function(id, data) {
      this.collection[id].data = data;
    }
  };
}]);