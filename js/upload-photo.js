'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var avatarChooser = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var housePhotoChooser = adForm.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = adForm.querySelector('.ad-form__photo');

  var onPhotoInputUpload = function (fileInput, placeToInsert) {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      if (placeToInsert.tagName.toLowerCase() === 'img') {
        reader.addEventListener('load', function () {
          placeToInsert.src = reader.result;
        });
      } else if (placeToInsert.tagName.toLowerCase() === 'div') {
        reader.addEventListener('load', function () {
          var newPhoto = housePhotoPreview.cloneNode(true);
          adForm.querySelector('.ad-form__photo-container').insertBefore(newPhoto, placeToInsert);

          newPhoto.style.backgroundImage = 'url(' + reader.result + ')';
          newPhoto.style.backgroundSize = 'cover';
          newPhoto.style.backgroundPosition = '50%';
          newPhoto.style.backgroundRepeat = 'no-repeat';
        });
      }
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    onPhotoInputUpload(avatarChooser, avatarPreview);
  });

  housePhotoChooser.addEventListener('change', function () {
    onPhotoInputUpload(housePhotoChooser, housePhotoPreview);
  });
})();
