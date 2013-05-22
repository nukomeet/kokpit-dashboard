'use strict';

angularjsSseApp.filter('fromNow', function(){
    return function(dateString) {
      return moment(new Date(dateString)).fromNow()
    };
});