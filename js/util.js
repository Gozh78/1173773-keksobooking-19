'use strict';

(function () {
  var LEFT_MOUSE_BUTON_RETURN = 0;
  var ENTER_KEY = 'Enter';

  var randomInteger = function (min, max) {
    // случайное число от min до max включительно
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  window.util = {
    LEFT_MOUSE_BUTON_RETURN: LEFT_MOUSE_BUTON_RETURN,
    ENTER_KEY: ENTER_KEY,
    randomInteger: randomInteger,
    ifEnterEventDoAction: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    ifLeftMouseEventDoAction: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTON_RETURN) {
        action();
      }
    }
  };
})();
