angular.
  module('paydayApp').
  component('wheel', {
    templateUrl:'wheel.html',
    controller: function WheelController($scope, $q) {
      function drawWheel() {
        console.log('drawing wheel');
        var segments = [];
        var next_fillstyle_idx = 0;
        var fillStyles = [
          '#ee1c24', '#3cb878', '#f6989d',
          '#00aef0', '#f26522', '#e70697',
          '#fff200', '#f6989d', '#ee1c24',
          '#3cb878', '#f26522', '#a186be',
          '#fff200', '#00aef0', '#ee1c24',
          '#f6989d', '#f26522', '#3cb878',
          '#a186be', '#fff200', '#00aef0'
        ];
        $scope.$parent.places.forEach(function(place) {
          segments.push(
            {'fillStyle' : fillStyles[next_fillstyle_idx], 'text' : place.name,
            'textFontSize': 18, textMargin: -5}
          )
          if (next_fillstyle_idx == fillStyles.length-1) {
            next_fillstyle_idx = 0;
          } else {
            next_fillstyle_idx ++;
          }
        });
        var theWheel = new Winwheel({
          'outerRadius'     : 241,        // Set outer radius so wheel fits inside the background.
          'innerRadius'     : 75,
          'centerY'           : 327.5,         // Make wheel hollow so segments don't go all way to center.
          'textFontSize'    : 24,         // Set default font size for the segments.
          // 'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
          'textOrientation' : 'horizontal',
          // 'textAlignment'   : 'outer',    // Align text to outside of wheel.
          'textAlignment'   : null,    // Align text to outside of wheel.
          'numSegments'     : segments.length,         // Specify number of segments.
          'segments'        : segments,
          // 'segments'        :             // Define segments including colour and text.
          // [                               // font size and test colour overridden on backrupt segments.
          //   {'fillStyle' : '#ee1c24', 'text' : '300'},
          //   {'fillStyle' : '#3cb878', 'text' : '450'},
          //   {'fillStyle' : '#f6989d', 'text' : '600'},
          //   {'fillStyle' : '#00aef0', 'text' : '750'},
          //   {'fillStyle' : '#f26522', 'text' : '500'},
          //   {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
          //   {'fillStyle' : '#e70697', 'text' : '3000'},
          //   {'fillStyle' : '#fff200', 'text' : '600'},
          //   {'fillStyle' : '#f6989d', 'text' : '700'},
          //   {'fillStyle' : '#ee1c24', 'text' : '350'},
          //   {'fillStyle' : '#3cb878', 'text' : '500'},
          //   {'fillStyle' : '#f26522', 'text' : '800'},
          //   {'fillStyle' : '#a186be', 'text' : '300'},
          //   {'fillStyle' : '#fff200', 'text' : '400'},
          //   {'fillStyle' : '#00aef0', 'text' : '650'},
          //   {'fillStyle' : '#ee1c24', 'text' : '1000'},
          //   {'fillStyle' : '#f6989d', 'text' : '500'},
          //   {'fillStyle' : '#f26522', 'text' : '400'},
          //   {'fillStyle' : '#3cb878', 'text' : '900'},
          //   {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
          //   {'fillStyle' : '#a186be', 'text' : '600'},
          //   {'fillStyle' : '#fff200', 'text' : '700'},
          //   {'fillStyle' : '#00aef0', 'text' : '800'},
          //   {'fillStyle' : '#ffffff', 'text' : 'LOOSE TURN', 'textFontSize' : 12}
          // ],
          'animation' :           // Specify the animation to use.
            {
              'type'     : 'spinToStop',
              'duration' : 8,     // Duration in seconds.
              'spins'    : 3,     // Default number of complete spins.
              'callbackFinished' : "$scope.alertPrize()"
            }
        });
        return theWheel
      }
      // Vars used by the code in this page to do power controls.

      // -------------------------------------------------------
      // Function to handle the onClick on the power buttons.
      // -------------------------------------------------------
      function powerSelected(powerLevel)
      {
        // Ensure that power can't be changed while wheel is spinning.
        if ($scope.wheelSpinning == false)
        {
            // Reset all to grey incase this is not the first time the user has selected the power.
            document.getElementById('pw1').className = "";
            document.getElementById('pw2').className = "";
            document.getElementById('pw3').className = "";

            // Now light up all cells below-and-including the one selected by changing the class.
            if (powerLevel >= 1)
            {
                document.getElementById('pw1').className = "pw1";
            }

            if (powerLevel >= 2)
            {
                document.getElementById('pw2').className = "pw2";
            }

            if (powerLevel >= 3)
            {
                document.getElementById('pw3').className = "pw3";
            }

            // Set wheelPower var used when spin button is clicked.
            $scope.wheelPower = powerLevel;

            // Light up the spin button by changing it's source image and adding a clickable class to it.
            document.getElementById('spin_button').src = "spin_on.png";
            document.getElementById('spin_button').className = "clickable";
        }
      }

      // -------------------------------------------------------
      // Click handler for spin button.
      // -------------------------------------------------------
      function startSpin()
      {
        // Ensure that spinning can't be clicked again while already running.
        if ($scope.wheelSpinning == false)
        {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            if ($scope.wheelPower == 1)
            {
                $scope.theWheel.animation.spins = 3;
            }
            else if ($scope.wheelPower == 2)
            {
                $scope.theWheel.animation.spins = 6;
            }
            else if ($scope.wheelPower == 3)
            {
                $scope.theWheel.animation.spins = 9;
            }

            // Disable the spin button so can't click again while wheel is spinning.
            document.getElementById('spin_button').src       = "spin_off.png";
            document.getElementById('spin_button').className = "";
            debugger;
            // Begin the spin animation by calling startAnimation on the wheel object.
            $scope.theWheel.startAnimation();

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            $scope.wheelSpinning = true;
        }
      }

      // -------------------------------------------------------
      // Function for reset button.
      // -------------------------------------------------------
      function resetWheel()
        {
          $scope.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
          $scope.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
          $scope.theWheel.draw();                // Call draw to render changes to the wheel.

          document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
          document.getElementById('pw2').className = "";
          document.getElementById('pw3').className = "";

          $scope.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
        }

    // -------------------------------------------------------
    // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
    // -------------------------------------------------------
    function alertPrize()
    {
        console.log(winningSegment);   
        // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
        winningSegment = theWheel.getIndicatedSegment();
        console.log(winningSegment);
        // Just alert to the user what happened.
        // In a real project probably want to do something more interesting than this with the result.
        if (winningSegment.text == 'LOOSE TURN')
        {
            alert('Sorry but you loose a turn.');
        }
        else if (winningSegment.text == 'BANKRUPT')
        {
            alert('Oh no, you have gone BANKRUPT!');
        }
        else
        {
            alert("You have won " + winningSegment.text);
        }
    }

    $scope.drawWheel = drawWheel;
    $scope.alertPrize = alertPrize;
    $scope.powerSelected = powerSelected;
    $scope.startSpin = startSpin;
    $scope.resetWheel = resetWheel;

      $scope.wheelPower    = 0;
      $scope.wheelSpinning = false;
      var winningSegment = null;
      // var theWheel = $scope.setup();
      // $scope.theWheel = theWheel;

    $scope.$parent.$watch("places", function() {
      theWheel = $scope.drawWheel();
      $scope.theWheel = theWheel;
    });
}
});
