'use strict';

(function () {
  var mapPinsList = document.querySelector('.map__pins');
  var mapPinMain = mapPinsList.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.ifLeftMouseEventDoAction(evt, function () {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var finalCoordX = mapPinMain.offsetLeft - shift.x;
        var finalCoordY = mapPinMain.offsetTop - shift.y;

        if (finalCoordX < (window.data.MAP_MIN_COORDINATE_X - window.data.PIN_HALF_WIDTH)) {
          finalCoordX = window.data.MAP_MIN_COORDINATE_X - window.data.PIN_HALF_WIDTH;
        } else if (finalCoordX > (window.data.MAP_MAX_COORDINATE_X - window.data.PIN_HALF_WIDTH)) {
          finalCoordX = window.data.MAP_MAX_COORDINATE_X - window.data.PIN_HALF_WIDTH;
        }

        if (finalCoordY < (window.data.MAP_MIN_COORDINATE_Y - window.data.PIN_WIDTH - window.data.PIN_PEAK_HEIGHT)) {
          finalCoordY = window.data.MAP_MIN_COORDINATE_Y - window.data.PIN_WIDTH - window.data.PIN_PEAK_HEIGHT;
        } else if (finalCoordY > (window.data.MAP_MAX_COORDINATE_Y - window.data.PIN_WIDTH - window.data.PIN_PEAK_HEIGHT)) {
          finalCoordY = window.data.MAP_MAX_COORDINATE_Y - window.data.PIN_WIDTH - window.data.PIN_PEAK_HEIGHT;
        }

        mapPinMain.style.top = (finalCoordY) + 'px';
        mapPinMain.style.left = (finalCoordX) + 'px';

        window.form.setAddressValue(finalCoordX + window.data.PIN_HALF_WIDTH,
            finalCoordY + window.data.PIN_WIDTH + window.data.PIN_PEAK_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
})();
