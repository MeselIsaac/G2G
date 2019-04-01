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






