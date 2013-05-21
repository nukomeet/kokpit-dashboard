angularjsSseApp.filter('color', function() {

  var COLORS = ["turquoise", "green-sea", "asbestos", "concrete", "silver", "clouds", "pomegranate", "alizarin", "pumpkin", "carrot", "orange", "sun-flower", "midnight-blue", "wet-asphalt", "wisteria", "amethyst", "belize-hole", "emerland", "nephritis", "peter-river"];

  return function(){
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
});