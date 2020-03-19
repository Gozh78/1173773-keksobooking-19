'use strict';

(function () {
  var LEFT_MOUSE_BUTTON_RETURN = 0;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var getRandomInteger = function (min, max) {
    // случайное число от min до max включительно
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  window.util = {
    LEFT_MOUSE_BUTTON_RETURN: LEFT_MOUSE_BUTTON_RETURN,
    ENTER_KEY: ENTER_KEY,
    getRandomInteger: getRandomInteger,
    ifEscEventDoAction: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    ifEnterEventDoAction: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    ifLeftMouseEventDoAction: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON_RETURN) {
        action();
      }
    }
  };
})();
