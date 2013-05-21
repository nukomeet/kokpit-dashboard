'use strict';

var angularjsSseApp = angular.module('angularjsSseApp', [])

$(function(){ //DOM Ready
  $(".gridster ul").gridster({
      widget_margins: [5, 5],
      widget_base_dimensions: [140, 140]
  });
});