// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var temp_marker = {};
const data = {}

function initMap() {
  var haightAshbury = {lat: 37.769, lng: -122.446};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: haightAshbury,
    mapTypeId: 'terrain'
  });

  // This event listener will call addMarker() when the map is clicked.
  // map.addListener('click', function(event) {
  //   addMarker(event.latLng);
  // });

  map.addListener('click', function(event) {
    console.log("Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng());
    // event.latLng.lng(0)
    // event.latLng.lat(0)
    deleteMarkers();

    let marker = new google.maps.Marker({
      position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
      map: map,
      title: 'Click to zoom'
    });
    temp_marker = marker;
    markers.push(marker);
    console.log(markers);

  });

}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };



      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


$(document).ready(function () {

  console.log('fsfs');
  $('#submitForm').on('submit', () => {
    $('#Longitude').val(temp_marker.position.lng())
    $('#Latitude').val(temp_marker.position.lat())
  });





})






//-----BACK UP OF AMITA's FUNCTION------

   // declared an empty object


    // use data object to store values (lat/lng title ,etc)
    // use ajax to send out this data object to the server


// console.log('fsfs');
//   $('#submitForm').on('submit', () => {
//     console.log("");
//     data = {
//       "Latitude": temp_marker.position.lat(),
//       "Longitude": temp_marker.position.lng(),
//       "Title": $('#title').val(),
//       "Description": $('#description').val(),
//       "Rating": $('#rating').val()
//     };
//     // declared an empoty object
//     console.log("THE MARKERS ARE HERE");
//     console.log(data);

//     // use data object to store values (lat/lng title ,etc)
//     // use ajax to send out this data object to the server
//     return false;
//   })

// })

//NOT SURE IF NEEDED STORING JUST IN CASE
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
