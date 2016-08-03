'use strict';

// Define the `phonecatApp` module
angular.module('paydayApp', [
  'ngAnimate',
  'ngRoute',
]);

// angular.
//     module('paydayApp').
//         directive('appClickToggle', function($animate) {
//   return function(scope, element) {
//     var currentStep = 0;
//     var maxStep = 3;
//     element.bind('click', function() {
//       var remove = 'step-' + currentStep;
//       $animate.removeClass(element, remove);
//       currentStep = (currentStep + 1) % maxStep;
//       var add = 'step-' + currentStep;
//       $animate.addClass(element, add);
//     });
//   }
// });