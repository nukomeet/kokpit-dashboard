'use strict';

var kokpitApp = angular.module('kokpitApp', [])

$(function(){ //DOM Ready
  $(".gridster ul").gridster({
      widget_margins: [5, 5],
      widget_base_dimensions: [140, 140]
  });
});