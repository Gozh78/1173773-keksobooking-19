'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');

  var filterHousingType = mapFilters.querySelector('#housing-type');
  var filterHousingPrice = mapFilters.querySelector('#housing-price');
  var filterHousingRooms = mapFilters.querySelector('#housing-rooms');
  var filterHousingGuests = mapFilters.querySelector('#housing-guests');

  var filterHousingFeatures = mapFilters.querySelector('#housing-features');
  var filterHousingFeatureWifi = filterHousingFeatures.querySelector('#filter-wifi');
  var filterHousingFeatureDishwasher = filterHousingFeatures.querySelector('#filter-dishwasher');
  var filterHousingFeatureParking = filterHousingFeatures.querySelector('#filter-parking');
  var filterHousingFeatureWasher = filterHousingFeatures.querySelector('#filter-washer');
  var filterHousingFeatureElevator = filterHousingFeatures.querySelector('#filter-elevator');
  var filterHousingFeatureConditioner = filterHousingFeatures.querySelector('#filter-conditioner');

  var onFilterChange = function (data) {
    var offerFilteredType = filterHousingType.value;
    var offerFilteredPrice = filterHousingPrice.value;
    var offerFilteredRooms = filterHousingRooms.value;
    var offerFilteredGuests = filterHousingGuests.value;

    var typeFilteredOffers;
    typeFilteredOffers = data.filter(function (oneOffer) {
      if (offerFilteredType === 'any') {
        return oneOffer;
      }

      return oneOffer.offer.type === offerFilteredType;
    });

    var priceFilteredOffers;
    priceFilteredOffers = typeFilteredOffers.filter(function (oneOffer) {
      if (offerFilteredPrice === 'middle') {
        return (oneOffer.offer.price >= 10000 && oneOffer.offer.price <= 50000);
      } else if (offerFilteredPrice === 'low') {
        return (oneOffer.offer.price < 10000);
      } else if (offerFilteredPrice === 'high') {
        return (oneOffer.offer.price > 50000);
      }

      return oneOffer;
    });

    var roomsFilteredOffers;
    roomsFilteredOffers = priceFilteredOffers. filter(function (oneOffer) {
      if (offerFilteredRooms === 'any') {
        return oneOffer;
      }

      return oneOffer.offer.rooms === Number(offerFilteredRooms);
    });

    var guestsFilteredOffers;
    guestsFilteredOffers = roomsFilteredOffers.filter(function (oneOffer) {
      if (offerFilteredGuests === 'any') {
        return oneOffer;
      }

      return oneOffer.offer.guests === Number(offerFilteredGuests);
    });

    var wifiFilteredOffers;
    wifiFilteredOffers = guestsFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureWifi.checked === true) {
        return oneOffer.offer.features.includes('wifi');
      }

      return oneOffer;
    });

    var dishwasherFilteredOffers;
    dishwasherFilteredOffers = wifiFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureDishwasher.checked === true) {
        return oneOffer.offer.features.includes('dishwasher');
      }

      return oneOffer;
    });

    var parkingFilteredOffers;
    parkingFilteredOffers = dishwasherFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureParking.checked === true) {
        return oneOffer.offer.features.includes('parking');
      }

      return oneOffer;
    });

    var washerFilteredOffers;
    washerFilteredOffers = parkingFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureWasher.checked === true) {
        return oneOffer.offer.features.includes('washer');
      }

      return oneOffer;
    });

    var elevatorFilteredOffers;
    elevatorFilteredOffers = washerFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureElevator.checked === true) {
        return oneOffer.offer.features.includes('elevator');
      }

      return oneOffer;
    });

    var conditionerFilteredOffers;
    conditionerFilteredOffers = elevatorFilteredOffers.filter(function (oneOffer) {
      if (filterHousingFeatureConditioner.checked === true) {
        return oneOffer.offer.features.includes('conditioner');
      }

      return oneOffer;
    });

    var filteredOffers = conditionerFilteredOffers;
    return filteredOffers;
  };

  window.mapFilter = {
    onFilterChange: onFilterChange
  };
})();
