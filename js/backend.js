'use strict';
// функции взаимодействия удалённым сервером через XHR

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var sendRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL_DATA = 'https://js.dump.academy/keksobooking/data';
      sendRequest(URL_DATA, 'GET', onLoad, onError);
    },

    send: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      sendRequest(URL, 'POST', onLoad, onError, data);
    },

    onLoadError: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; background: red; background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 25%, red 25%, red 50%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.3) 75%, red 75%, red); background-size: 50px 50px;';
      node.style.position = 'fixed';
      node.style.left = '0';
      node.style.right = '0';
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
