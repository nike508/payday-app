angular.
  module('paydayApp').
  component('homepage', {
    templateUrl:'homepage.html',
    controller: function HomepageController($scope, $q) {
      $scope.placesFound = false;
      function getCoords() {
        var deferred = $q.defer();
        navigator.geolocation.getCurrentPosition(
          function(position) {
            console.log('got position');
            deferred.resolve(position.coords); },
          function(error) { deferred.resolve(null); }
        );
        return deferred.promise;
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        console.log('error');
      }

      function getNearby(lat, lng) {
      console.log('in getNearby');
      console.log(lat);
      console.log(lng);
        var deferred = $q.defer();
        var latlng = new google.maps.LatLng(lat, lng);
        var request = {
          location: latlng,
          radius: '500',
          openNow: 'true',
          types: ['restaurant'],
          maxPriceLevel: 2
        };

        service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(request,
          function(places) {
            deferred.resolve(places);
          }
        );
        return deferred.promise;
      }

      function click() {
        $scope.num += 1;
       }

      // $scope.places = [
      //   {'name': 'Sunset Grill', 'desc': "Quick Brown Fox Jumps Over The Lazy Dog"},
      //   {'name': 'Deep Ellum', 'desc': "Quick Brown Fox Jumps Over The Lazy Dog"},
      //   {'name': 'Tits', 'desc': "Quick Brown Fox Jumps Over The Lazy Dog"},
      //   {'name': 'Lincoln Tavern', 'desc': "Quick Brown Fox Jumps Over The Lazy Dog"}
      // ];

      $scope.lat = "Test";
      $scope.lng = "Test";
      $scope.num = 0;

      $scope.click = click;

      getCoords().then(function(coords) {
        $scope.lat = coords.latitude;
        $scope.lng = coords.longitude;
      }).then(function() {
        getNearby($scope.lat, $scope.lng).then(function(places) {
          console.log('found places');
          $scope.places = places;
          $scope.placesFound = true;
        });
      });


      }
  });