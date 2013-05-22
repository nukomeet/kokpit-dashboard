'use strict';

var kokpitApp = angular.module('kokpitApp', [])

$(function(){ //DOM Ready
  $(".gridster ul").gridster({
      widget_margins: [9, 9],
      widget_base_dimensions: [320, 320]
  });
});