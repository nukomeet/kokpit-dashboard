'use strict';

kokpitApp.filter('fromNow', function(){
    var date;
    return function(dateString) {
      if (dateString) {
        date = new Date(dateString);
        return "Last update at " + moment(date).format('h:mm');
      }
      return null;
    };
});