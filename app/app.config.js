'use strict';

angular.
  module('paydayApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<homepage></homepage>'
        }).
        otherwise('/');
    }
  ]);
